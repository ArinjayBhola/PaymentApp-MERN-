import { Link } from "react-router-dom";

const Signup = () => {
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
            />
          </div>
          <div className="mb-4 w-full">
            <h3 className="text-xl">Last Name</h3>
            <input
              type="text"
              className="border rounded-lg px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4 w-full">
            <h3 className="text-xl">Email</h3>
            <input
              type="text"
              className="border rounded-lg px-2 py-1 w-full"
            />
          </div>
          <div className="mb-6 w-full">
            <h3 className="text-xl">Password</h3>
            <input
              type="password"
              className="border rounded-lg px-2 py-1 w-full"
            />
          </div>
        </div>
        <div className="w-full">
          <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">Sign Up</button>
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
