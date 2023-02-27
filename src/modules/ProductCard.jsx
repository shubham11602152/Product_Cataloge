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
import { toDollarUS } from "../common/utils/utilFuncs";
import styles from "./ProductCard.module.css";

export default function ProductCard({ title, price, category, image, rating }) {
  return (
    <>
      <Card className={styles.card} elevation={3}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt="Paella dish"
        />
        <Chip label={category} color="primary" className={styles.chip} />

        <CardContent className={styles.cardContent}>
          <Box>
            <Stack
              flexDirection={"row"}
              justifyContent="space-between"
              gap={"24px"}
              marginBottom="8px"
            >
              <Typography variant="h6" color="text.primary">
                {toDollarUS(price)}
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
