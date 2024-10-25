function BreedDisplay({ selectedBreed }) {
  if (!selectedBreed) return null;

  return (
    <div className="display_dog">
      <img src={selectedBreed.img} alt={selectedBreed.name} />
      <h1>{selectedBreed.name}</h1>
    </div>
  );
}

export default BreedDisplay;
