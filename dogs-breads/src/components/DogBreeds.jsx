import { useState, useEffect } from "react";

function DogBreeds({ breeds, onBreedSelect }) {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [localBreeds, setLocalBreeds] = useState([]);

  useEffect(() => {
    if (Array.isArray(breeds) && breeds.length > 0) {
      setLocalBreeds(breeds);
      setSelectedBreed(breeds[0]);
      // Informujemy komponent nadrzędny o pierwszym wyborze
      onBreedSelect?.(breeds[0]);
    }
  }, [breeds, onBreedSelect]);

  const handleBreedChange = (event) => {
    const selectedBreedName = event.target.value;
    const breed = localBreeds.find((b) => b.name === selectedBreedName);
    setSelectedBreed(breed);
    onBreedSelect(breed);
  };

  if (!localBreeds.length) {
    return <div>Ładowanie ras...</div>;
  }

  return (
    <div className="breeds__link">
      <form id="select" className="breeds__link__do">
        <select id="breeds" value={selectedBreed?.name || ""} onChange={handleBreedChange}>
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
