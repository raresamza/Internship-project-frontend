import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { login } from '../api/AuthService';
import useAuth from '../hooks/useAuth';

const Login = () => {


  const nav = useNavigate()


  const decodedToken = useAuth();
  console.log(decodedToken)


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(4, "Password needs to be at least 4 characters long").required('Password is required'),
  });

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log("Form submitted");
            await login(values.email, values.password).then(() => nav('/sign-in'))
          }}
        >
          {(formik) => (
            <Form className="flex flex-col max-w-[480px] mx-auto mt-[4rem]">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-8"
              >
                Login
              </motion.h1>
              <motion.label
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-semibold text-xl mb-2"
                htmlFor="email"
              >
                Email:
              </motion.label>
              <Field
                type="email"
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2"
                id="email"
                name="email"
                placeholder="johndoe@gmail.com"
              />
              <ErrorMessage name="email">
                {(msg) => <div className={formik.touched.email && formik.errors.email ? "text-red-500" : ""}>{msg}</div>}
              </ErrorMessage>

              <motion.label
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-semibold text-xl mb-2"
                htmlFor="password"
              >
                Password:
              </motion.label>
              <Field
                className="border-[2px] border-gray-900 rounded-md p-2 mb-2"
                type="password"
                id="password"
                name="password"
                placeholder="*******"
              />
              <ErrorMessage name="password">
                {(msg) => <div className={formik.touched.password && formik.errors.password ? "text-red-500" : ""}>{msg}</div>}
              </ErrorMessage>

              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                type="submit"
                className="px-6 py-3 bg-blue-600 cursor-pointer hover:bg-blue-500 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg"
              >
                Log in
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="pb-4 font-semibold"
                id="login-info"
              ></motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex gap-12 items-center mb-6"
              >
                <Link to="/reset-password" className="underline font-semibold hover:text-gray-800 duration-150">
                  Forgot password
                </Link>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-md font-semibold"
              >
                No account?{' '}
                <Link to="/sign-up" className="text-blue-700 hover:text-blue-600 duration-150 underline">
                  Sign up
                </Link>
              </motion.p>
            </Form>
          )}
        </Formik>
      </motion.div>
    </>
  );
};

export default Login;
