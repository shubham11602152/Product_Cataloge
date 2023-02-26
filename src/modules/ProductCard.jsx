import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

let dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  useGrouping: false,
});

export default function ProductCard({ title, price, category, image, rating }) {
  return (
    <>
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt="Paella dish"
        />
        <Chip
          label={category}
          color="primary"
          sx={{ position: "absolute", top: "16px", left: "16px" }}
        />

        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <Box>
            <Stack
              flexDirection={"row"}
              justifyContent="space-between"
              gap={"24px"}
              marginBottom="8px"
            >
              <Typography variant="h6" color="text.primary">
                {dollarUS.format(price)}
              </Typography>
              <Chip label={category} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Rating name="read-only" value={rating} readOnly />
        </CardContent>
      </Card>
    </>
  );
}
