import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center m-4 border-b-2">
        <p className="text-lg font-bold">Payments App</p>
        <p className="text-lg">Hello User</p>
      </div>
      <div className="m-4">
        <p className="text-xl font-semibold mb-3">Your Balance ₹8000</p>
        <p className="text-lg font-semibold">Users</p>
        <input
          type="text"
          placeholder="Search Users..."
          className="border rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div>
        <div className="flex justify-between items-center m-4">
          <p className="text-lg">User1</p>
          <button className="bg-black text-white p-2 rounded">
            <Link to={"/send"}>Send Money</Link>
          </button>
        </div>
        <div className="flex justify-between items-center m-4">
          <p className="text-lg">User2</p>
          <button className="bg-black text-white p-2 rounded">
            <Link to={"/send"}>Send Money</Link>
          </button>
        </div>
        <div className="flex justify-between items-center m-4">
          <p className="text-lg">User3</p>
          <button className="bg-black text-white p-2 rounded">
            <Link to={"/send"}>Send Money</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
