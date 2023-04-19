import { RouterProvider } from "react-router-dom";
import { ItemsStoreContext } from "components/2FactorAuth/store"; // import the store
import router from "routes";

function App() {
  return (
    <ItemsStoreContext.Consumer>
      {(itemsStore) => (
        <RouterProvider
          router={router}
          fallbackElement={<div>loading...</div>}
        />
      )}
    </ItemsStoreContext.Consumer>
  );
}

export default App;
