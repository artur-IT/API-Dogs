import { useState, useEffect } from "react";

const API_URL = "https://dog.ceo/api";

function RandomDog() {
  const [dogImage, setDogImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/breeds/image/random`)
      .then((response) => response.json())
      .then((data) => setDogImage(data.message))
      .catch((error) => console.error("Ups, coś poszło nie tak!", error));
  }, []);

  return (
    <>
      <div className="random">
        <h1>Random Dog for Today</h1>
      </div>
      <div className="breed__dog">{dogImage && <img src={dogImage} alt="Random dog" />}</div>;
    </>
  );
}

export default RandomDog;
