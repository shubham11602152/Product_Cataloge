const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  useGrouping: false,
});

export const toDollarUS = (value) => {
  return dollarUS.format(value);
};
