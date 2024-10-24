import { useState, useEffect } from "react";

// Showing select option of list all breeds
function DogBreeds({ breeds, onBreedSelect }) {
  const [selectedBreed, setSelectedBreed] = useState("-- select breed --");
  const [localBreeds, setLocalBreeds] = useState([]);

  useEffect(() => {
    if (Array.isArray(breeds) && breeds.length > 0) {
      setLocalBreeds(breeds);
      if (!selectedBreed) {
        onBreedSelect(breeds[0]);
      }
    }
  }, [breeds, selectedBreed, onBreedSelect]);

  // Handle selected name of breed
  const handleBreedChange = (event) => {
    const selectedBreedName = event.target.value;
    const breed = localBreeds.find((b) => b.name === selectedBreedName);
    setSelectedBreed(breed.name);
    onBreedSelect(breed);
  };

  if (!localBreeds.length) return <div>Ładowanie ras...</div>;

  return (
    <div className="breeds_list_container">
      <form id="select" className="breeds_list_dog">
        <select id="breeds" className="breeds_list_select" value={selectedBreed} onChange={handleBreedChange}>
          <option className="first_option">{selectedBreed}</option>
          {localBreeds.map((breed) => (
            <option key={breed.name} className="breeds_list_option" value={breed.name} name={breed.name}>
              {breed.name}
            </option>
          ))}
        </select>
      </form>
      <div className="description">
        <p>Have you seen a dog today but you don&#39;t know what breed it is?</p>
        <p>
          Check it here! <img src="./arrow-up.png" alt="arrow up" className="arrow" />{" "}
        </p>
      </div>
    </div>
  );
}
export default DogBreeds;
