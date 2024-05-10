import { useState } from "react";
import "./Admin.css";
import axios from "axios";

export default function Admin() {
    const [users, setUsers] = useState([]);
    function getUsers() {
        axios.get("http://localhost:3001/get")
            .then(res => {
                setUsers(res.data);
                console.log(users);
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='Header'>
                <h1>Admin</h1>
            </div>
            <div className="admin--body">
                <button id="admin--button" onClick={getUsers}>Get Data</button>
            </div>
            <div>
            <table className="display--table">
    <thead>
        <tr>
            <th>User</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody>
        {users.map((user, index) => {
            if (user.username !== "admin") {
                return (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.score}</td>
                    </tr>
                );
            } else {
                return null; // Skip rendering the admin user
            }
        })}
    </tbody>
</table>


            </div>
        </div>
    );

}