import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function Filter({
  label,
  variant,
  options = ["no options"],
  filterHandler,
  endIcon,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    filterHandler(index, option);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        variant={variant}
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={endIcon}
      >
        {label}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options?.map((option, index) => (
          <MenuItem
            key={option}
            selected={selectedIndex === index}
            onClick={(event) => {
              handleMenuItemClick(event, index, option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
