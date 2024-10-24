import PropTypes from "prop-types";

function BreedDisplay({ selectedBreed }) {
  if (!selectedBreed) return null;

  return (
    <div className="breed__dog">
      <img src={selectedBreed.image} alt={selectedBreed.name} />
      <p>{selectedBreed.name.toUpperCase()}</p>
    </div>
  );
}

BreedDisplay.propTypes = {
  selectedBreed: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default BreedDisplay;
