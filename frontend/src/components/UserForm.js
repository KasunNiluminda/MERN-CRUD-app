// UserForm.js
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Grid,
} from "@mui/material";
import API_BASE_URL from "../config/config";
import SuccessDialog from "./common/SuccessDialog";
import messages from "./common/messages";
import ErrorDialog from "./common/ErrorDialog";

const UserForm = ({ setUsers, setFilteredUsers }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    gender: "",
  });

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [erroressage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users1`, formData);
      setUsers((prevUsers) => [...prevUsers, data]);
      setFilteredUsers((prevUsers) => [...prevUsers, data]);
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        gender: "",
      });
      setSuccessMessage(messages.userAdded); // Set success message from common messages
      setOpenSuccessDialog(true); // Open the Dialog on successful form submission
    } catch (error) {
      // console.error("Error adding user:", error);
      setErrorMessage(messages.errorOccurred);
      setOpenErrorDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);
    // Close the Dialog
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="dob"
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ fontWeight: "bold" }}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success Dialog */}
      <SuccessDialog
        open={openSuccessDialog}
        handleClose={handleCloseDialog}
        message={successMessage}
      />
      <ErrorDialog
        open={openErrorDialog}
        handleClose={handleCloseDialog}
        message={erroressage}
      />

      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="User added successfully"
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          User added successfully
        </Alert>
      </Snackbar> */}
    </Container>
  );
};

export default UserForm;
