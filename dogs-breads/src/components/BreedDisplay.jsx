function BreedDisplay({ selectedBreed }) {
  if (!selectedBreed) return null;

  return (
    <div className="display_dog">
      <img src={selectedBreed.img} alt={selectedBreed.name} />
      <h2>{selectedBreed.name.toUpperCase()}</h2>
    </div>
  );
}

export default BreedDisplay;
