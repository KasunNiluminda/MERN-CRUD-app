import React from "react";
import { TextField, Container } from "@mui/material";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <Container>
      <TextField
        label="Search users by name"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        fullWidth
        margin="normal"
        // variant="outlined"
        color="primary"
        InputProps={{
          sx: {
            borderRadius: '25px', 
            height: '46px',  
            padding: '25px',     
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '0.875rem',  
            color: '#6c757d',     //  label color
            margin: '0 0 8px 0',  // margin for the label
            padding: '0 8px',     // padding for the label
          },
        }}
      />
    </Container>
  );
};

export default SearchBar;
