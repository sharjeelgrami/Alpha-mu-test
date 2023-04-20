import { RouterProvider } from "react-router-dom";
import { ItemsStoreContext } from "components/2FactorAuth/store"; // import the store
import router from "routes";
import { useContext } from "react";

function App() {
  const itemsStore = useContext(ItemsStoreContext); // use the useContext hook to access the store

  return (
    <RouterProvider router={router} fallbackElement={<div>loading...</div>} />
  );
}

export default App;
