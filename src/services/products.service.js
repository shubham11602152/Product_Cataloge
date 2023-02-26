import { toProducts } from "../mappers/products-mapper";

const getProducts = async () => {
  const data = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );

  return toProducts(data);
};

export { getProducts };
