import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Label } from 'recharts';
import { Button } from './ui/button';
import { makeRequest } from '@/useful/ApiContext';

function Forgotpassword() {
  const { token } = useParams();
  const navigate=useNavigate()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await 
      makeRequest({url:`users/forgot/${token}`,type:'post',data:{password}})
      setLoading(false);
      setSuccess('Password reset successfully!');
      setPassword('');
      setConfirmPassword('');
      console.log(response);
      if(response?.status==200){
        navigate('/login')
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        < >
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>

        < >
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>

        {error && <>{error}</>}
        {success && <div className="text-green-500 text-sm mt-2">{success}</div>}

        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}

export default Forgotpassword;
