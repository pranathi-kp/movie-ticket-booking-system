import React from 'react';
import LoginForm from '../components/FormComponents/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
    <div className="signup-page w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>
      <LoginForm />
    </div>
  </div>
  );
};

export default LoginPage;

