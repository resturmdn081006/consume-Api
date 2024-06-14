import React, { useState, useEffect } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserCreate() {
    const [payload, setPayload] = useState({
        username: null,
        email: null,
        password: null,
        role: null,
    });
    const [user, setUser] = useState([]);
    const [error, setError] = useState({});
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setUser(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }, [navigate]);

    function handleInputFileChange(e) {
        const { name, files } = e.target;
        setPayload(prevPayload => ({
            ...prevPayload,
            [name]: files[0]
        }));
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('username', payload.username);
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        formData.append('role', payload.role);

        // Log the FormData keys and values
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }

        axios.post('http://localhost:8000/user', formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(res => {
            setError({});
            setAlert(true);
            console.log("Success:", res.data);
        })
        .catch(err => {
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                console.error("Error response:", err.response);
                setError(err.response.data);
            }
        });
    }

    return (
        <Case>
            <div className="relative overflow-x-auto shadow-md px-20 py-3">
                    <Link to="/user" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg">Kembali</Link>  
            </div>
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-white dark:text-white">Add a new User Data</h2>
                {
                    alert && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium">Success!</span> Check User data on <b><Link to="/inbound">this page</Link></b>.
                        </div>
                    )
                }
                {
                    Object.entries(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {
                                        Object.entries(error).map(([key, value]) => (
                                            <li key={key}>{key !== "status" && key !== "message" ? value : ''}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                }
                <form onSubmit={handleSubmitForm}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">username</label>
                            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayload({ ...payload, username: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayload({ ...payload, email: e.target.value })} required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayload({ ...payload, password: e.target.value})} required />
                        </div>
                        <div>
                            <label htmlFor="role" className="block mb-2 text-sm font-medium text-white dark:text-white">role</label>
                            <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setPayload({ ...payload, role: e.target.value })} required>
                                <option hidden disabled selected>Select Role</option>
                                {
                                    user.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add User
                    </button>
                </form>
            </div>
        </Case>
    );
}