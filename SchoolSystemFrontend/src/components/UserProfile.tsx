import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';



const UserProfile = () => {


    //   const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);


    const [laoding, setLaoding] = useState(true)

    const [user, setUser] = useState(null)

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       setLaoding(true);
    //       try {
    //         const user = await UserService.getUserByEmail(jwtDecode(cookies.jwt).sub, cookies.jwt)
    //         setUser(user.data)
    //       } catch (err) {
    //         console.log(err)
    //       }
    //       setLaoding(false);
    //     };
    //     fetchData();
    //   }, []);

    // const saveUser = (e) => {
    //   e.preventDefault();

    //     let email=jwtDecode(cookies.jwt).sub
    //     UserService.getUserByEmail(email).then((response) => {
    //       console.log(response);
    //     }).catch((err) => {
    //       console.log(err);
    //     })

    //   }

    if (laoding) {
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full">
        <Loader2 className='animate-spin text-muted-foreground' size={48} />
      </div>
    }

    return (
        <>
            <Navbar />
            <h1 className='px-44 text-4xl font-bold py-10 mb-16'> User Profile</h1>

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='pl-44 flex items-center justify-start'
            >
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='px-36 py-16 bg-gray-300 w-[560px] flex items-center justify-center rounded-lg relative'
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='absolute left-10 w-32 h-32 flex items-center justify-center rounded-full bg-white'
                        >
                            <FontAwesomeIcon className='text-6xl' icon={faUser} />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className='text-2xl font-semibold'
                        >
                            Placeholder Name
                        </motion.p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='border-gray-400 flex justify-center items-center'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='outline-none border-none bg-transparent underline flex py-8 text-xl font-semibold'
                        >
                            Logout
                        </motion.button>
                    </motion.div>
                </div>
                <div className='pl-10'>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className='pb-20 w-2/4'
                    >
                        <motion.label
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="font-semibold text-xl"
                        >
                            First name:
                        </motion.label>
                        <motion.input
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="border-[2px] border-gray-900 rounded-md p-2 h-12 w-[500px]"
                            type="text"
                            id="fname"
                            name="firstName"
                            placeholder="Placeholder first name"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className='w-2/4'
                    >
                        <motion.label
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="font-semibold text-xl"
                        >
                            Last name:
                        </motion.label>
                        <motion.input
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="border-[2px] border-gray-900 rounded-md p-2 h-12 w-[500px]"
                            type="text"
                            id="lname"
                            name="lastName"
                            placeholder="Placeholder last name"
                        />
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className='border-gray-400 border-b-2 pt-24'
            ></motion.div>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className='flex items-center justify-between text-center h-60'
            >
                <Link className='flex flex-col justify-center' to="/grades">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center'
                    >
                        Check grades
                    </motion.button>
                </Link>
                <Link className='flex flex-col justify-center' to="/absences">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center'
                    >
                        Check presence
                    </motion.button>
                </Link>
                <Link className='flex flex-col justify-center' to="/courses">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center'
                    >
                        Check course work
                    </motion.button>
                </Link>
            </motion.div >
        </>
    )
}
export default UserProfile