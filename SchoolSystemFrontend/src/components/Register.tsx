import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { register } from '../api/AuthService';
import useAuth from '../hooks/useAuth';

const Register = () => {

  const  decodedToken  = useAuth();
  console.log(decodedToken)

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };

  // Function to toggle visibility of the second password field
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };


  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed'),
    age: Yup.number()
      .required('Age is required')
      .min(0, 'Age must be a positive number')
      .integer('Age must be an integer'),
    parentEmail: Yup.string().email('Invalid email address').required('Parent Email is required'),
    parentName: Yup.string().required('Parent Name is required').matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed'),
    phoneNumber: Yup.string().min(10, 'Phone numbers are required to be 10 digits').max(10, 'Phone numbers are required to be 10 digits').required('Phone number is required').matches(/^[0-9]+$/, 'Only numbers are allowed'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().required('Password is required').min(5, 'Password must be at least 5 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <>
      <Navbar />
      <Formik
        initialValues={{
          name: '',
          age: '',
          parentEmail: '',
          parentName: '',
          phoneNumber: '',
          address: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log('Form submitted');
          await register(values);
          console.log(values);
        }}
      >
        {(formik) => (
          <Form className="flex flex-col max-w-[480px] mx-auto mt-[4rem]">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-8"
            >
              Register
            </motion.h1>

            {/* Animation for Name label and field */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2"
            >
              <label htmlFor="name" className="font-semibold text-xl">
                Name:
              </label>
              <Field
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2 w-full"
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
              />
            </motion.div>
            <ErrorMessage name="name" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-2"
            >
              <label htmlFor="age" className="font-semibold text-xl">
                Age:
              </label>
              <Field
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2 w-full"
                type="text"
                id="age"
                name="age"
                placeholder="21"
              />
            </motion.div>
            <ErrorMessage name="age" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-2"
            >
              <label htmlFor="parentEmail" className="font-semibold text-xl">
                Parent Email:
              </label>
              <Field
                type="email"
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2 w-full"
                id="parentEmail"
                name="parentEmail"
                placeholder="parent@gmail.com"
              />
            </motion.div>
            <ErrorMessage name="parentEmail" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-2"
            >
              <label htmlFor="parentName" className="font-semibold text-xl">
                Parent Name:
              </label>
              <Field
                type="text"
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2 w-full"
                id="parentName"
                name="parentName"
                placeholder="Parent Name"
              />
            </motion.div>
            <ErrorMessage name="parentName" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-2"
            >
              <label htmlFor="phoneNumber" className="font-semibold text-xl">
                Phone number:
              </label>
              <Field
                type="text"
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2 w-full"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="1234567890"
              />
            </motion.div>
            <ErrorMessage name="phoneNumber" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-2"
            >
              <label htmlFor="address" className="font-semibold text-xl">
                Address:
              </label>
              <Field
                type="text"
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2 w-full"
                id="address"
                name="address"
                placeholder="123 Main St"
              />
            </motion.div>
            <ErrorMessage name="address" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-2"
            >
              <label htmlFor="password" className="font-semibold text-xl">
                Password:
              </label>
              <div className="protectedInput flex rounded-md hover:shadow-lg border-2 border-black mb-2">
                <Field
                  type={showPassword1 ? 'text' : 'password'} 
                  name="password"
                  id="password"
                  placeholder="**************"
                  className="bg-transparent w-full rounded-tl-md rounded-bl-md px-2 focus:outline-none focus:shadow-md"
                />
                <button type="button" className="bg-gray-100 px-4 py-2 rounded-tr-md rounded-br-md" onClick={togglePasswordVisibility1}>
                  <FontAwesomeIcon icon={showPassword1 ? faEye : faEyeSlash} /> 
                </button>
              </div>
            </motion.div>
            <ErrorMessage name="password" component={motion.div} className="text-red-500" />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="mb-2"
            >
              <label htmlFor="confirmPassword" className="font-semibold text-xl">
                Confirm password:
              </label>
              <div className="protectedInput flex rounded-md hover:shadow-lg border-2 border-black mb-2">
                <Field
                  type={showPassword2 ? 'text' : 'password'} 
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="**************"
                  className="bg-transparent w-full rounded-tl-md rounded-bl-md px-2 focus:outline-none focus:shadow-md"
                />
                <button type="button" className="bg-gray-100 px-4 py-2 rounded-tr-md rounded-br-md" onClick={togglePasswordVisibility2}>
                  <FontAwesomeIcon icon={showPassword2 ? faEye : faEyeSlash} /> 
                </button>
              </div>
            </motion.div>
            <ErrorMessage name="confirmPassword" component={motion.div} className="text-red-500" />

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              type="submit"
              className="px-6 py-3 bg-blue-700 cursor-pointer hover:bg-blue-600 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg mb-6"
            >
              Register
            </motion.button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
