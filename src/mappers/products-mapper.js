const toProducts = (response) => {
  let mappedProducts = [];

  mappedProducts = response.map((product) => {
    const {
      id,
      title,
      image,
      description,
      price,
      category,
      rating: { rate: rating },
    } = product;

    return { id, title, image, description, price, category, rating };
  });

  return mappedProducts;
};

export { toProducts };
