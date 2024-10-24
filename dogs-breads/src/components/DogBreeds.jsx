/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function DogBreeds({ breeds, onBreedSelect }) {
  console.log("DogBreeds otrzymał breeds:", breeds);

  const [selectedBreed, setSelectedBreed] = useState(null);
  const [localBreeds, setLocalBreeds] = useState([]);
  // breeds.forEach((item) => console.log(item.name));

  useEffect(() => {
    console.log("useEffect breeds:", breeds);
    if (Array.isArray(breeds) && breeds.length > 0) {
      setLocalBreeds(breeds);
      setSelectedBreed(breeds[0]);
      // Informujemy komponent nadrzędny o pierwszym wyborze
      onBreedSelect?.(breeds[0]);
    }
  }, [breeds, onBreedSelect]);

  // const testArray = [
  //   { name: "Bulldog", img: "url_do_obrazka" },
  //   { name: "Labrador", img: "url_do_obrazka" },
  // ];

  const handleBreedChange = (event) => {
    const selectedBreedName = event.target.value;
    const breed = localBreeds.find((b) => b.name === selectedBreedName);
    setSelectedBreed(breed);
    onBreedSelect(breed);
  };

  // Dodajemy log stanu lokalnego
  console.log("localBreeds:", localBreeds);

  // Pokazujemy informację o ładowaniu tylko gdy nie mamy danych
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

DogBreeds.propTypes = {
  breeds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DogBreeds;
