import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Typography, Container, Box, Link, Backdrop, CircularProgress } from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    setLoading(true); 
    toast.info('Signing in...', { autoClose: 2000 }); 

    try {
      const userData = { email, password };
      const response = await axios.post('http://localhost:8080/api/auth/signin', userData);

      setTimeout(() => {  
        setLoading(false);  

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          toast.success('Sign-in successful!');
          navigate('/dashboard');
        } else {
          toast.error(`Error: ${response.data.message}`);
        }
      }, 3000);
      
    } catch (error) {
      setLoading(false);  

      
      if (error.response && error.response.status === 401) {
        
        const errorMessage = error.response.data.message || 'Incorrect email or password';
        toast.error(errorMessage); 
      } else {
        console.error('Error during sign-in:', error);
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSignIn} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Sign In
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link onClick={() => navigate('/signup')} sx={{ color: 'primary.main', cursor: 'pointer' }}>
          Sign up
        </Link>
      </Typography>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Full-screen loading backdrop with dark background */}
      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>Signing in...</Typography>
        </Box>
      </Backdrop>
    </Container>
  );
};

export default SignIn;
