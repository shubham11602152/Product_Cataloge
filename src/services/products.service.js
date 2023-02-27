import { toProducts } from "../mappers/products-mapper";

const getProducts = async () => {
  try {
    const data = await fetch("https://fakestoreapi.com/products").then(
      (res) => {
        if (res.status >= 400) {
          throw new Error("Server responded with error!");
        }
        return res.json();
      }
    );

    return toProducts(data);
  } catch (e) {
    console.error(e);
  }
};

export { getProducts };
