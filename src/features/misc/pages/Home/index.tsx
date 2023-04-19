import { Text, Container } from "components/elements";
import { observer } from "mobx-react-lite";
import TwoFactorAuth from "components/2FactorAuth";

const Home = () => {
  return (
    <Container>
      <Text>This is home page</Text>
      <TwoFactorAuth />
    </Container>
  );
};

export default observer(Home);
