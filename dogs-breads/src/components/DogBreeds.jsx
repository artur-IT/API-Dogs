import { useState, useEffect } from "react";

// Showing select option of list all breeds
function DogBreeds({ breeds, onBreedSelect }) {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [localBreeds, setLocalBreeds] = useState([]);

  useEffect(() => {
    if (Array.isArray(breeds) && breeds.length > 0) return setLocalBreeds(breeds);
  }, [breeds, selectedBreed, onBreedSelect]);

  // Handle selected name of breed
  const handleBreedChange = (event) => {
    const selectedBreedName = event.target.value;
    const breed = localBreeds.find((b) => b.name === selectedBreedName);
    // console.log(breed);
    setSelectedBreed(breed.name);
    onBreedSelect(breed);
  };

  if (!localBreeds.length) return <div>Ładowanie ras...</div>;

  return (
    <div className="breeds_list">
      <form id="select" className="breeds_list_dog">
        <select id="breeds" value={selectedBreed} onChange={handleBreedChange}>
          <option>--select breed--</option>
          {localBreeds.map((breed) => (
            <option key={breed.name} className="breeds__link__do" value={breed.name} name={breed.name}>
              {breed.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
export default DogBreeds;
