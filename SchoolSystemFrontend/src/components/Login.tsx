import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value
        setUser({ ...user, [e.target.name]: value })
        console.log(user.email);
        console.log(user.password);

    }

    const nav = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    


    return (
        <>
            <Navbar></Navbar>
            <form className="flex flex-col max-w-[480px] mx-auto mt-[4rem]" >
                <h1 className="text-4xl font-bold mb-8">Login</h1>
                <label className="font-semibold text-xl mb-2">Email:</label>
                <input onChange={(e) => handleChange(e)} type="email" className="border-[2px] border-gray-900 rounded-md p-2 mb-6" id="ename" name="email" placeholder="johndoe@gmail.com" value={user.email} />
                <label className="font-semibold text-xl">Password:</label>
                <input onChange={(e) => handleChange(e)} className="border-[2px] border-gray-900 rounded-md p-2 mb-6" defaultValue={user.password} type="password" id="password" name="password" placeholder="*******" />
                <p className="pb-4 font-semibold" id="login-info"></p>
                <div className="flex gap-12 items-center mb-6">
                    <input type="submit" value="Log in" className="px-6 py-3 bg-blue-600 cursor-pointer hover:bg-blue-500 hover:shadow-xl duration-150 font-semibold w-[max-content] rounded-lg" />
                    {/* <button onClick={(e) => getSessionStorage(e)} className="bg-green-600 rounded-lg h-12  w-36 align-left text-white float-right hover:bg-green-700 font-semibold ">Get session storage</button> */}
                    <Link to="/reset-password" className="underline font-semibold hover:text-gray-800 duration-150">Forgot password</Link>
                </div>
                <p className="text-md font-semibold">No account? <Link to="/sign-up" className="text-blue-700 hover:text-blue-600 duration-150 underline">Sign up</Link></p>
            </form>
        </>
    );
};

//3 ron

export default Login;