import { useState, useEffect } from "react";
import RandomDog from "../src/components/RandomDog";
import DogBreeds from "../src//components/DogBreeds";

const API_URL = "https://dog.ceo/api";
const breedsArray = [];

function App() {
  const [breeds, setBreeds] = useState(breedsArray);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Przed renderowaniem, breeds:", breeds);

  const showBreeds = (list) => {
    let test = Array.of(list);
    console.log("Rozpoczęcie showBreeds z listą:", test);

    Object.entries(list).forEach(([breed, subBreeds]) => {
      // add 1 dog & image for each SUBBREED
      if (subBreeds.length > 0) {
        subBreeds.forEach((subBreed) => {
          fetch(`${API_URL}/breed/${breed}/${subBreed}/images/random`)
            .then((response) => response.json())
            .then((img) =>
              breedsArray.push({
                name: `${breed} ${subBreed}`,
                img: img.message,
              })
            );
        });
      } else {
        // add 1 dog & image for each BREED
        fetch(`${API_URL}/breed/${breed}/images/random`)
          .then((response) => response.json())
          .then((img) =>
            breedsArray.push({
              name: breed,
              img: img.message,
            })
          );
      }
    });
    // console.log(breedsArray);
    // console.log("Zakończenie showBreeds, tabBreeds:", breedsArray);
    setBreeds(breedsArray);
    return breedsArray;
  };

  useEffect(() => {
    // setBreeds(breedsArray);
    // setIsLoading(false);
    fetch(`${API_URL}/breeds/list/all`)
      .then((breeds) => breeds.json())
      .then((breeds) => {
        let test = Object.entries(breeds.message).map(([breed, subBreeds]) => ({
          breed,
          subBreeds,
        }));
        console.log("Dane otrzymane z API:", test);
        // showBreeds(breeds.message);
      })
      .catch((err) => console.log("Uppps, something's wrong!", err));

    // console.log("Breeds w useEffect:", breeds);
  });

  if (isLoading) {
    return <div>Ładowanie danych...</div>;
  }

  // console.log("Breeds przed przekazaniem do komponentu:", breeds);

  return (
    <div className="App">
      {/* <RandomDog /> */}
      {/* {console.log(breedsArray)} */}

      <DogBreeds breeds={breeds} />
    </div>
  );
}

export default App;
