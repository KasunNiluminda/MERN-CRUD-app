import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import API_BASE_URL from "../config/config";
import UpdateUserDialog from "../components/UpdateUserDialog"; // Import the updating UI dialog component
import SuccessDialog from "./common/SuccessDialog";
import messages from "./common/messages";
import ErrorDialog from "./common/ErrorDialog";

const UserTable = ({ users, setUsers, setFilteredUsers }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
      setOpenConfirm(false);
      setSuccessMessage(messages.userDeleted);
      setOpenSuccessDialog(true);
    } catch (error) {
      // console.error("Error deleting user:", error);
      setOpenConfirm(false);
      setErrorMessage(messages.errorOccurred);
      setOpenErrorDialog(true);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      dob: new Date(user.dob).toISOString().split("T")[0], // Convert to yyyy-mm-dd format
      address: user.address,
      gender: user.gender,
    });
    setOpenUpdate(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${API_BASE_URL}/users/${selectedUser._id}`, formData);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...formData } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...formData } : user
        )
      );
      // console.log("User updated:", formData);
      setOpenUpdate(false);
      setSuccessMessage(messages.userUpdated);
      setOpenSuccessDialog(true);
    } catch (error) {
      // console.error("Error updating user:", error);
      setOpenUpdate(false);
      setErrorMessage(messages.errorOccurred);
      setOpenErrorDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenSuccessDialog(false);
    setOpenErrorDialog(false);
    // Close the Dialog
  };

  const handleOpenConfirm = (user) => {
    setSelectedUser(user);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.text.primary,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>
                  {new Date(user.dob).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>{user.address}</StyledTableCell>
                <StyledTableCell>{user.gender}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleUpdate(user)}
                    sx={{ mr: 1 }} // Add margin to the right of the Update button
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenConfirm(user)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update User Dialog */}
      <UpdateUserDialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDelete(selectedUser._id)}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
};

export default UserTable;
