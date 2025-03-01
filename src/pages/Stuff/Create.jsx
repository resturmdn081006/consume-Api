import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function StuffCreate() {
    const [forms, setForms] = useState({
        name: '',
        category: '',
    })
    const [error, setError] = useState([])

    const navigate = useNavigate()

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    const handleCreateStuff = (event) => {
        event.preventDefault();

        instance.post('stuff', forms)
            .then(res => {
                navigate('/stuff');
            })
            .catch(err => {
                setError(err.response.data.data)
                console.log(err.response);
            })
    }
    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                {
                       error && Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            error.message
                                            // Object.entries(error).map(([key, value], i) => (
                                                // <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            // ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                    </div>
                    <form onSubmit={handleCreateStuff} class="max-w-sm mx-auto">
                        <div class="mb-5">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                            <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Nama Barang" required  onChange={e => setForms({...forms, name: e.target.value})} />
                        </div>
                        <div class="mb-5">
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Barang</label>
                            <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setForms({...forms, category: e.target.value})}>
                                <option selected>Pilih Kategori</option>
                                <option value="HTL">Hotel</option>
                                <option value="TBG">Kuliner</option>
                                <option value="Teknisi/Sarpras">Sarpras</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <Link to="/stuff" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    )
}
