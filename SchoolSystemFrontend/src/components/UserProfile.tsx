import React from 'react'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

    return (
        <>
            <Navbar></Navbar>
            <h1 className='px-44 text-4xl font-bold py-10   mb-16'> User Profile</h1>

            <div className='pl-44 flex items-center justify-start'>
                <div>
                    <div className='px-36 py-16  bg-gray-300  w-[560px] flex items-center justify-center rounded-lg relative'>
                        <div className='absolute left-10 w-32 h-32 flex items-center justify-center rounded-full bg-white'>
                            <FontAwesomeIcon className='text-6xl' icon={faUser} />
                        </div>

                        <p className=' text-2xl font-semibold'>Placeholder Name</p>
                    </div>
                    <div className=' border-gray-400 flex justify-center items-center'>
                        <button className='outline-none border-none bg-transparent underline flex py-8 text-xl font-semibold  '>Logout</button>
                    </div>
                </div>
                <div className='pl-10  '>
                    <div className='pb-20 w-2/4  '>
                        <label className="font-semibold text-xl ">First name:</label>
                        <input className="border-[2px] border-gray-900 rounded-md p-2 h-12 w-[500px]" type="text" id="fname" name="firstName" placeholder="Placeholder first name" />
                    </div>
                    <div className='w-2/4'>
                        <label className="font-semibold text-xl">Last name:</label>
                        <input className="border-[2px] border-gray-900 rounded-md p-2 h-12 w-[500px]" type="text" id="lname" name="lastName" placeholder="Placeholder last name" />
                    </div>
                </div>
            </div>
            <div className=' border-gray-400 border-b-2 pt-24'></div>
            <div className='flex items-center justify-between text-center h-60'>
                <Link className='flex flex-col justify-center' to="/grades"> <button className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center '> Check grades</button></Link>
                <Link className='flex flex-col justify-center' to="/absences"> <button className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center '> Check presence</button></Link>
                <Link className='flex flex-col justify-center' to="/courses"> <button className='px-44 outline-none border-none bg-transparent underline text-xl font-semibold flex justify-start items-center '>Check course work</button></Link>
            </div>
        </>
    )
}
export default UserProfile