import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

DogBreeds.propTypes = {
  breeds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function DogBreeds({ breeds }) {
  console.log("DogBreeds otrzymał breeds:", breeds);

  const breedsArray = Object.values(breeds);
  const [localBreeds, setLocalBreeds] = useState([]);

  useEffect(() => {
    setLocalBreeds(breeds);
  }, [breeds]);

  // if (breedsArray.length === 0) {
  //   return <div>Brak ras...</div>;
  // }

  // const testArray = [
  //   { name: "Bulldog", img: "url_do_obrazka" },
  //   { name: "Labrador", img: "url_do_obrazka" },
  // ];

  const handleClick = (breed) => {
    document.querySelector("div.breed__dog").innerHTML = `
      <img src="${breed.image}" alt="${breed.name}"> 
      <p>${breed.name.toUpperCase()}</p>
    `;
    document.querySelector("div.random h1").textContent = "";
    window.scrollTo(0, 0);
  };

  return (
    <div className="breeds__link">
      <form id="select" className="breeds__link__do">
        <select id="breeds">
          {breedsArray.map((breed, idx) => (
            <option key={idx} className="breeds__link__do" onClick={() => handleClick(breed)}>
              {breed.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default DogBreeds;
