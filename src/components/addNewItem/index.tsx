import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsStoreContext } from "components/2FactorAuth/store";
import { Item } from "components/2FactorAuth/2FactorAuthProps";

const generateUniqueId = (): string => {
  let timestamp = new Date().getTime().toString(36);
  let randomString = Math.random().toString(36).substr(2, 5);
  return timestamp + randomString;
};

const NewItemPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const itemsStore = useContext(ItemsStoreContext);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() !== "") {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
      const newItem: Item = { name, code, id: generateUniqueId() };
      itemsStore.addItem(newItem);
      setName("");
      navigate("/");
    }
  };

  return (
    <div className="add-new-item">
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default NewItemPage;
