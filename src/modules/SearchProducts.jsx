import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchProducts({ productsData, onSelectHandler }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState();
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...productsData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setInput(value);

    if (!value) {
      setOpen(false);
    }
  };

  return (
    <Autocomplete
      fullWidth
      sx={{ width: { sm: 300 } }}
      open={open}
      onInputChange={onChangeHandler}
      onChange={(event, value) => {
        if (value) onSelectHandler(value);
      }}
      onClick={() => {
        setOpen(false);
      }}
      onOpen={() => {
        if (input) setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      clearOnBlur={false}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      noOptionsText="No product found"
      renderInput={(params) => (
        <TextField
          {...params}
          label="search a product"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
