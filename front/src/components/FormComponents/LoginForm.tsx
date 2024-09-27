import React, { useState } from 'react'; // Import useState
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { setToken, setIsAdmin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setErrorMessage(''); 
    const response = await loginUser(values.email, values.password);

    if (response.token) {
      setToken(response.token, response.user.isAdmin);
      // setIsAdmin(response.user.isAdmin);
      
      navigate('/');
    } else {
      setErrorMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {errorMessage && <div className="text-red-500 text-xs italic mb-4">{errorMessage}</div>} 
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
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute right-2 top-2 text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic mt-1" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
