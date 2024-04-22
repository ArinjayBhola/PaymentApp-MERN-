import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      firstname,
      lastname,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center shadow-lg w-1/3  p-6 bg-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <p>Enter your information to create an account</p>
        <div className="mt-4 w-full">
          <div className="mb-4 w-full">
            <h3 className="text-xl">First Name</h3>
            <input
              type="text"
              className="border rounded-lg px-2 py-1 w-full"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4 w-full">
            <h3 className="text-xl">Last Name</h3>
            <input
              type="text"
              className="border rounded-lg px-2 py-1 w-full"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4 w-full">
            <h3 className="text-xl">Email</h3>
            <input
              type="text"
              className="border rounded-lg px-2 py-1 w-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-6 w-full">
            <h3 className="text-xl">Password</h3>
            <input
              type="password"
              className="border rounded-lg px-2 py-1 w-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded w-full"
            onClick={postData}>
            Sign Up
          </button>
          <p className="mt-4">
            Already have an account?
            <Link to="/signin"> Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
