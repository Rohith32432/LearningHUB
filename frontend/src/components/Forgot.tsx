import React, { useState } from 'react';
import axios from 'axios';  
import { FormControl } from './ui/form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { makeRequest } from '@/useful/ApiContext';
import useToast from '@/hooks/useToast';
function Forgot() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
const {promisetoast}=useToast()
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email) {
      setError('Email is required.');
      return;
    }

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
     const response = await makeRequest({type:'post',url:'/users/forgot',data:{email}}) 
      setLoading(false);
      setSuccess(true);
      console.log('Response:', response.data);

      // Optional: Show a success message or redirect user
      // For example: Redirect to the login page or show a success alert
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        < >
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <>{error}</>}
        </>

        {success && (
          <div className="text-green-500 text-sm mt-2">Password reset link sent! Check your email.</div>
        )}

        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  );
}

export default Forgot;
