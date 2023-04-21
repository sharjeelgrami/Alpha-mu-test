import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsStoreContext } from "components/2FactorAuth/store";
import { Item } from "components/2FactorAuth/2FactorAuthProps";

const generateUniqueId = (): string => {
  let timestamp = new Date().getTime().toString(36);
  let randomString = Math.random().toString(36).substr(2, 5);
  return timestamp + randomString;
};

export const generateCode = (): string => {
  return (Math.floor(Math.random() * 900000) + 100000).toString();
};

const NewItemPage = () => {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const itemsStore = useContext(ItemsStoreContext);

  // Handle form submission
  const handleAddItemClick = () => {
    if (itemName) {
      const newItem: Item = {
        id: generateUniqueId(),
        name: itemName,
        code: generateCode(),
      };
      itemsStore.addItem(newItem);
      itemsStore.resetCodeAndTimer(newItem);
      setItemName("");
      navigate("/");
    }
  };

  return (
    <>
      <div className="add-new-item">
        <input
          type="text"
          placeholder="Enter name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button onClick={handleAddItemClick}>Add Item</button>
      </div>
      <button onClick={() => navigate("/")}>Go Back</button>
    </>
  );
};

export default NewItemPage;
