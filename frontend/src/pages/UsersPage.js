import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import { Box, Container, Typography } from "@mui/material";
import API_BASE_URL from "../config/config";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${API_BASE_URL}/users`);
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#f1f8e9", // Light background color for the section
          p: "1rem 0 2rem 0", // Add padding for spacing
          borderRadius: "8px", // Rounded corners
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
         
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textDecoration: "underline", fontWeight: "bold" }}
          align="center"
        >
          User Management
        </Typography>
        <UserForm setUsers={setUsers} setFilteredUsers={setFilteredUsers} />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#e3f2fd", // Light background color for the section
          p: "1rem 0 2rem 0", // Add padding for spacing
          borderRadius: "8px", // Rounded corners
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
          mt: 2, // Margin top for spacing
          mb: 3, // Margin bottom for spacing
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            sx={{
              // mb: 2,               // Margin bottom for spacing
              fontWeight: "bold", // Bold font weight
              color: "#333", // Darker color for contrast
            }}
          >
            All Users
          </Typography>
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </Box>

        <UserTable
          users={filteredUsers}
          setUsers={setUsers}
          setFilteredUsers={setFilteredUsers}
        />
      </Container>
    </>
  );
};

export default UsersPage;
