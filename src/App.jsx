import { useState, useEffect } from "react";
import RandomDog from "../src/components/RandomDog";
import DogBreeds from "../src//components/DogBreeds";
import BreedDisplay from "./components/BreedDisplay";

const API_URL = "https://dog.ceo/api";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        // Get all breeds
        const response = await fetch(`${API_URL}/breeds/list/all`)
          .then((breeds) => breeds.json())
          .catch((err) => console.log("Uppps, something's wrong!", err));

        const data = await response;

        // Change data structure to match the desired format
        const breedsList = Object.entries(data.message).map(([breed, subBreeds]) => ({
          breed,
          subBreeds,
        }));
        const result = await showBreeds(breedsList);
        setBreeds(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania ras:", error);
      }
    };
    fetchBreeds();
  }, []);

  const handleBreedSelect = (breed) => setSelectedBreed(breed);

  // Create list of breeds with name & image
  const showBreeds = async (list) => {
    const breedsArray = new Array();
    const promises = [];

    list.forEach((item) => {
      // add 1 dog & image for SUBBREED
      if (item.subBreeds.length > 0) {
        item.subBreeds.forEach((subBreed) => {
          promises.push(
            fetch(`${API_URL}/breed/${item.breed}/${subBreed}/images/random`)
              .then((response) => response.json())
              .then((img) =>
                breedsArray.push({
                  name: `${item.breed} ${subBreed}`,
                  img: img.message,
                })
              )
          );
        });
      } else {
        // add 1 dog & image for BREED
        promises.push(
          fetch(`${API_URL}/breed/${item.breed}/images/random`)
            .then((response) => response.json())
            .then((img) =>
              breedsArray.push({
                name: item.breed,
                img: img.message,
              })
            )
        );
      }
    });
    // Wait for all data to be loaded
    await Promise.all(promises);
    return breedsArray;
  };

  if (isLoading) return <div className="loading">Wait, the dogs are running...</div>;

  return (
    <div className="wrap">
      <h1 className="title">Dog breeds</h1>
      {selectedBreed ? <BreedDisplay selectedBreed={selectedBreed} /> : <RandomDog />}
      <DogBreeds breeds={breeds} onBreedSelect={handleBreedSelect} />
    </div>
  );
}

export default App;
