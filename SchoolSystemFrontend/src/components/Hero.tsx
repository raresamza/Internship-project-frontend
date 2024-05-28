import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Hero = () => {


    const nav = useNavigate()

    const handleGetStartedClick = () => {
        nav('/sign-in');
      };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100">
      <section className="text-center py-20">
        <motion.h1
          className="text-5xl font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Grades, Simplified
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Access, track, and manage your academic performance effortlessly.
        </motion.p>
        <motion.button
          className="bg-yellow-400 text-blue-900 py-3 px-8 rounded hover:bg-yellow-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.1,transition: { duration: 0.2, delay: 0 } }}
          whileTap={{ scale: 0.90 }}
          onClick={handleGetStartedClick}
        >
          Get Started
        </motion.button>
      </section>
    </div>
        )
}

export default Hero