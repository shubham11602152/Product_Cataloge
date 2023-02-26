import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState, useReducer } from "react";
import { getProducts } from "../services/products.service";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Filter from "./Filter";
import ProductCard from "./ProductCard";

function reducerProducts(state, action) {
  switch (action.type) {
    case "setProductsList": {
      return {
        ...state,
        productsList: action.newProductsList,
        filteredProducts: action.newProductsList,
      };
    }
    case "setFilteredProducts": {
      return {
        ...state,
        filteredProducts: action.newProductsList,
      };
    }
    case "setCategories": {
      return {
        ...state,
        categories: action.newCategories,
      };
    }
    case "reset": {
      return {
        productsList: [],
        categories: [],
        filteredProducts: [],
      };
    }
    default:
      throw Error("Unknown action" + action.type);
  }
}

const Products = () => {
  const [products, dispatchProducts] = useReducer(reducerProducts, {
    productsList: [],
    categories: [],
    filteredProducts: [],
  });
  const [loading, setLoading] = useState(false);
  const sortByOptions = ["High to Low", "Low to High", "345"];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await getProducts();
      dispatchProducts({ type: "setProductsList", newProductsList: data });
      setLoading(false);

      const categories = data.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
          return [...acc, curr.category];
        }
        return acc;
      }, []);

      dispatchProducts({ type: "setCategories", newCategories: categories });
    }
    fetchProducts();

    return () => {
      dispatchProducts({ type: "reset" });
    };
  }, []);

  const filterCategoriesHandler = (optionIndex, option) => {
    const filteredProducts = products.productsList.filter(
      (product) => product.category === option
    );
    dispatchProducts({
      type: "setFilteredProducts",
      newProductsList: filteredProducts,
    });
    return;
  };

  const filterSortByHandler = (optionIndex, option) => {
    switch (optionIndex) {
      case 0: {
        const sortedProductsDesc = products.filteredProducts.sort(
          (prod1, prod2) => prod2.price - prod1.price
        );
        dispatchProducts({
          type: "setFilteredProducts",
          newProductsList: sortedProductsDesc,
        });
        break;
      }
      case 1: {
        const sortedProductsAsc = products.filteredProducts.sort(
          (prod1, prod2) => prod1.price - prod2.price
        );
        dispatchProducts({
          type: "setFilteredProducts",
          newProductsList: sortedProductsAsc,
        });
        break;
      }
      default:
        throw Error("filter functionality not defined for : " + option);
    }

    return;
  };

  const Loader = () => (
    <Container
      sx={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
  return (
    <>
      <Typography variant="h5">Products</Typography>
      <Stack
        flexDirection={"row"}
        justifyContent="flex-end"
        gap={3}
        marginBottom={2}
      >
        <Filter
          variant="outlined"
          label="Filter"
          options={products.categories}
          filterHandler={filterCategoriesHandler}
        />
        <Filter
          label="Sort by"
          options={sortByOptions}
          filterHandler={filterSortByHandler}
          endIcon={<KeyboardArrowDownIcon />}
        />
      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <Grid
          container
          gap={3}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px, 1fr))",
          }}
        >
          {products.filteredProducts.map((product) => {
            const { title, price, image, category, rating } = product;
            const productCardProps = { title, price, image, category, rating };

            return <ProductCard {...productCardProps} key={image} />;
          })}
        </Grid>
      )}
    </>
  );
};

export default Products;
