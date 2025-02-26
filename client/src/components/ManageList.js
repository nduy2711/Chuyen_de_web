import { necklaces } from "../necklaces";

function ManageList() {
  return (
    <>
      <div className="grid-container">
        {necklaces.map((necklace) => (
          <div key={necklace.name} className="product-card">
            {necklace.name}
            <button>Delete</button>
            <button>Update</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageList;
