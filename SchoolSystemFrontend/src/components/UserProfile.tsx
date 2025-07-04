import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { toast } from 'sonner';
import { sendGradeChart } from '../api/HomeworkService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getStudentByEmail,downloadStudentSchedule } from '../api/StudentService'; 
import { logout } from '../api/AuthService';



const UserProfile = () => {




  const [loading, setLoading] = useState(true)

  const decoded = useAuth();


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
              {decoded?.FirstName} {decoded?.LastName}
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
              onClick={logout}
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
              placeholder={decoded?.FirstName}
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
              placeholder={decoded?.LastName}
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
        <Link className='flex flex-col justify-center' to="/catalogue">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center'
          >
            Check grades
          </motion.button>
        </Link>
        <Link className='flex flex-col justify-center' to="/catalogue">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center'
          >
            Check presence
          </motion.button>
        </Link>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center'
  onClick={async () => {
    try {
      const student = await getStudentByEmail(decoded?.email);
      await downloadStudentSchedule(student.id);
    } catch (error) {
      toast.error("❌ Could not download schedule");
      console.error(error);
    }
  }}
>
  Download Timetable
</motion.button>

      </motion.div >
    </>
  )
}
export default UserProfile