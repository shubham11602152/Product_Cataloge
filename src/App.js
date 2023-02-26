import { Container } from "@mui/material";
import Products from "./modules/Products";

function App() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 3 }}>
      <Products />
    </Container>
  );
}

export default App;
