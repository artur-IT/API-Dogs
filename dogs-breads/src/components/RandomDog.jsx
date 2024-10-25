import { useState, useEffect } from "react";

const API_URL = "https://dog.ceo/api";

function RandomDog() {
  const [dogImage, setDogImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/breeds/image/random`)
      .then((response) => response.json())
      .then((data) => setDogImage(data.message))
      .catch((error) => console.error("Ups, something is wrong!", error));
  }, []);

  return (
    <>
      <div className="random_dog">
        <div className="breed__dog">{dogImage && <img src={dogImage} alt="Random dog" />}</div>
        <h1>Random Dog for Today</h1>
      </div>
    </>
  );
}

export default RandomDog;
