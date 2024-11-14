import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    toast.info('Signing up...');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username,
        email,
        phone,
        address,
        password,
      });

      toast.success('Sign-up successful! Redirecting to dashboard...');
      console.log('Sign-Up Response:', response.data);

      // Navigate to the dashboard after a short delay to allow toast to display
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error during sign-up:', error);
      toast.error(error.response?.data?.message || 'Sign-up failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSignUp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default SignUp;
