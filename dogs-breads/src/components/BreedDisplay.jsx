function BreedDisplay({ selectedBreed }) {
  if (!selectedBreed) return null;

  return (
    <div className="breed__dog">
      <img src={selectedBreed.image} alt={selectedBreed.name} />
      <p>{selectedBreed.name.toUpperCase()}</p>
    </div>
  );
}

export default BreedDisplay;
