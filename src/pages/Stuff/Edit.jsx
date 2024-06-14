import { useEffect, useRef, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function StuffEdit() {
    const [forms, setForms] = useState({
        name: '',
        category: ''
    })

    const params = useParams()
    const id = params.id

    const [error, setError] = useState([]);

    const navigate = useNavigate()

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })

    useEffect(() => {
        instance.get(`stuff/${id}`)
            .then(res => {
                setForms(res.data.data)
            })
            .catch(err => {
                console.log(err.response);
            })
    })
    return (
        <Case name='Stuff Edit'>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {
                        Object.keys(error).length > 0 ? (
                            <div role="alert">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        {
                                            Object.entries(error).map(([key, value], i) => (
                                                <li key={key}>{key != "status" ? i+1 + '. ' + value : ''}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3x1 font-medium text-gray-900 dark:text-white">Stuff</h5>
                    </div>
                    <form onSubmit={handleEditStuff} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:-bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-primary-500 focus:border-primary-500" defaultValue={forms.name} placeholder="Ketik Nama Barang" required/>
                        </div>
                        <div className="mb-5">
                            <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:-bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                                <option selected>Pilih kategori</option>
                                <option value="HTL" selected={forms.category == 'HTL' ? 'selected' : ''}>Hotel</option>
                                <option value="TBG" selected={forms.category == 'TBG' ? 'selected' : ''}>Kuliner</option>
                                <option value="Teknisi/Sarpras" selected={forms.category == 'Teknisi/Sarpras' ? 'selected' : ''}>Sarpras</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ubah</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    )
}