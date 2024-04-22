import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter).then((res) => {
      setUser(res.data.user);
    });
  }, [filter]);
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
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div>
        {user.map((data, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between items-center m-4">
                <p className="text-lg">{data.firstname}</p>
                <button
                  className="bg-black text-white p-2 rounded"
                  onClick={() => navigate("/send?id=" + data._id + "&name=" + data.firstname)}>
                  Send Money
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
