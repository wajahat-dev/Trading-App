import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const TypographyWithLink = ({ to, children }) => {
  return (
    <Typography component={Link} to={to} color="primary" underline="hover">
      {children}
    </Typography>
  );
};

export default TypographyWithLink;
