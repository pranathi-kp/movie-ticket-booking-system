import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const { setToken, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    userType: Yup.string().oneOf(['user', 'admin'], 'Invalid user type').required('User type is required'),
  });

  const handleSubmit = async (values: { username: string; email: string; password: string; userType: string }) => {
    const isAdmin = values.userType === 'admin';
    const response = await signupUser(values.username, values.email, values.password, isAdmin);
    
    if (response.token) {
      setToken(response.token, isAdmin);
      // setIsAdmin(isAdmin);
      navigate('/');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', userType: 'user' }} // Default to 'user'
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <Field name="username" type="text" className="border border-gray-300 p-2 rounded w-full" />
            <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic mt-1" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <Field name="email" type="email" className="border border-gray-300 p-2 rounded w-full" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic mt-1" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="border border-gray-300 p-2 rounded w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic mt-1" />
          </div>

          {/* User Type Selector */}
          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
            <Field as="select" name="userType" className="border border-gray-300 p-2 rounded w-full">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
            <ErrorMessage name="userType" component="div" className="text-red-500 text-xs italic mt-1" />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
