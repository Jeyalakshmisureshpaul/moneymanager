import React from "react";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Box, Select } from "@mui/material";

//To track weekly,monthly and yearly data
export function Dashboard({ color }) {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>DashBoard</h1>

      <Box sx={{ m: 2, textAlign: "center" }}></Box>
      <Box sx={{ minWidth: 140, m: 5 }}>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">View By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Choose"
          >
            <Link to="/weekly" style={{ color: color, textDecoration: "none" }}>
              <MenuItem>Weekly</MenuItem>
            </Link>
            <Link
              to="/monthly"
              style={{ color: color, textDecoration: "none" }}
            >
              <MenuItem>Monthly</MenuItem>
            </Link>
            <Link to="/yearly" style={{ color: color, textDecoration: "none" }}>
              <MenuItem>Yearly</MenuItem>
            </Link>
          </Select>
        </FormControl>
        <Box
          sx={{
            float: "right",
            mr: 5,
            fontFamily: "Zen Kaku Gothic Antique",
            fontWeight: "600",
            fontSize: "25px",
          }}
        ></Box>
      </Box>
    </>
  );
}