import { useState, useEffect } from "react";
// import RandomDog from "../src/components/RandomDog";
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
        const response = await fetch(`${API_URL}/breeds/list/all`)
          .then((breeds) => breeds.json())
          .catch((err) => console.log("Uppps, something's wrong!", err));

        const data = await response;
        // console.log("z App: ", data);
        const breedsList = Object.entries(data.message).map(([breed, subBreeds]) => ({
          breed,
          subBreeds,
        }));
        const result = await showBreeds(breedsList);
        console.log("rezultat showBreeds(data):   ", result);
        setBreeds(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania ras:", error);
      }
    };
    fetchBreeds();
  }, []);

  const handleBreedSelect = (breed) => {
    setSelectedBreed(breed);
  };

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
    await Promise.all(promises);
    return breedsArray;
  };

  if (isLoading) {
    return <div>Ładowanie danych...</div>;
  }

  return (
    <div className="App">
      {/* <RandomDog /> */}
      <BreedDisplay selectefBreed={selectedBreed} />
      <DogBreeds breeds={breeds} onBreedSelect={handleBreedSelect} />
    </div>
  );
}

export default App;
