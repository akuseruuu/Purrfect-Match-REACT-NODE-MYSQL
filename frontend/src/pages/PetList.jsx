import PetCard from "../components/PetCard";

function PetList({ pets, onEdit, onDelete }) {
  if (!pets.length) {
    return <p className="panel">No pets found. Add one to get started.</p>;
  }

  return (
    <section className="pet-grid">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}

export default PetList;
