import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link } from "react-router-dom";
import InboundDelete from "./InboundDelete";
import UserDelete from "./UserDelete";
import UserEdit from "../pages/User/UserEdit";
// import Inbound from "../pages/Inbound/InboundIndex";

export default function Table({ headers, data, endpoint, inputData, titleModal, identitasColumn, opsiButton, columnForTd }) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endpointToSend, setEndpointToSend] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [error, setError] = useState([]);
    const [isInboundDeleteOpen, setIsInboundDeleteOpen] = useState(false);
    const [isUserDeleteOpen, setIsUserDeleteOpen] = useState(false);
    const [isUserEditOpen, setIsUserEditOpen] = useState(false);


    useEffect(()=> {
        axios.get(endpoint['data_detail'],{
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setDataDetail(res.data.data);
        })
        .catch(err => {
            console.log(err)
            if(err.response.status == 401){
                navigate('/login?message=' + encodeURIComponent('anda belum login'));
            }
        })
    },[]);

    function handleModalDelete(id) {
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail" : replaceUrlDetail,
            "delete" : replaceUrlDelete,
        }

        setEndpointToSend(endpointReplaced);
        setIsModalDeleteOpen(true)
    }

    function handleModalEdit(id) {
        const endpointUpdate = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail" : replaceUrlDetail,
            "update" : replaceUrlUpdate,
        }
        setEndpointToSend(endpointReplaced);
        setIsModalEditOpen(true)
    }
    
    function handleUserDelete(id) {
        const endpointDelete = endpoint['UserDelete'];
        const endpointDetail = endpoint['UserDetail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "UserDetail" : replaceUrlDetail,
            "UserDelete" : replaceUrlDelete,
        }

        setEndpointToSend(endpointReplaced);
        setIsUserDeleteOpen(true)
    }

    function handleUserEdit(id) {
        const endpointUpdate = endpoint['UserEdit'];
        const endpointDetail = endpoint['UserDetail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "UserDetail" : replaceUrlDetail,
            "UserEdit" : replaceUrlUpdate,
        }
        setEndpointToSend(endpointReplaced);
        setIsUserEditOpen(true)
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setDataDetail(prevDataDetail => ({
            ...prevDataDetail,
            [name]: value
        }));
    }

    function handleModalAdd(){
        const endpointToSend = {
            "store": endpoint['store'],
        }
        setEndpointToSend(endpointToSend);
        setIsModalAddOpen(true)
    }

    function handleRestore(id) {
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }

    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endpoint['delete_permanent'].replace("{id}", id);
        
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }
    
    // function handleInboundAdd(){
    //     const endpointToSend = {
    //         "createInbound": endpoint['store'],
    //     }
    //     setEndpointToSend(endpointToSend);
    //     setIsModalAddOpen(true)
    // }



    function handleInboundDelete(id) {
        const endpointDelete = endpoint['InboundDelete'];
        const endpointDetail = endpoint['InboundDetail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "InboundDetail" : replaceUrlDetail,
            "InboundDelete" : replaceUrlDelete,
        }

        setEndpointToSend(endpointReplaced);
        setIsInboundDeleteOpen(true)
    }

    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
            <div className="flex justify-end">
                {
                    opsiButton.includes("create") ? (
                        <button type="button" onClick={handleModalAdd} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5 rounded-lg">Create</button>
                    ) : ''
                }   
                {
                    opsiButton.includes("trash") ? (
                        <Link to={'/stuff/trash'} class="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 mb-5 rounded-lg">Trash</Link>
                    ) : ''
                }
                
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header, index) => (
                            <th scope="col" class="px-6 py-3" key={index}>{header}</th>
                        ))}
                        <th scope="col" class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        Object.entries(data).map(([index, item]) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{parseInt(index) + 1}.</td>
                                {
                                    Object.entries(columnForTd).map(([key, value]) => (
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespaces-nowrap dark:text-white">{!value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ? item[key.replace(/[!&*;:]/g, '')][value] : '0'}</td>
                                    ))
                                }
                                {/* <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.category}</td>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.stuff_stock ? item.stuff_stock.total_available : '0'}
                                </td>
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.stuff_stock ? item.stuff_stock.total_defec : '0'}
                                </td> */}
                                {/* Aksi */}
                                <td class="px-6 py-4 text-right">
                                    {
                                        opsiButton.includes("edit") ? (
                                            <button type="button" onClick={() => handleModalEdit(item.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline" value={dataDetail[index]} onChange={handleInputChange}>Edit</button>
                                        ) : ''
                                    }
                                    {
                                        opsiButton.includes("delete") ? (
                                            <button type="button" onClick={() => handleModalDelete(item.id)} class="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Delete</button>
                                        ) : ''
                                    }
                                    {
                                        opsiButton.includes("restore") ? (
                                            <button onClick={() => handleRestore(item.id)} type="button" className="font-medium text-green-600 dark:text-green-500 hover:underline ml-3">Restore</button>
                                        ) : ''
                                    }
                                    {
                                        opsiButton.includes("delete_permanent") ? (
                                            <button onClick={() => handlePermanentDelete(item.id)} type="button" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                        ) : ''
                                    }
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {
                                        opsiButton.includes("InboundDelete") ? (
                                            <button type="button" onClick={() => handleInboundDelete(item.id)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mb-5 rounded-lg">Delete</button>
                                        ) : ''
                                    }
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {
                                        opsiButton.includes("UserDelete") ? (
                                            <button type="button" onClick={() => handleUserDelete(item.id)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mb-5 rounded-lg">Delete</button>
                                        ) : ''
                                    }
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {
                                        opsiButton.includes("UserEdit") ? (
                                            <button type="button" onClick={() => handleUserEdit(item.id)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-5 rounded-lg" onChange={handleInputChange}>Edit</button>
                                        ) : ''
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
        </table>
    </div>
    <ModalDelete isOpen={isModalDeleteOpen} dataDetail={dataDetail} onClose={() => setIsModalDeleteOpen(false)} endpoint={endpointToSend} titleModal={titleModal} identitasColumn={identitasColumn}></ModalDelete>

    <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalEdit>

    <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endpoint={endpointToSend} inputData={inputData} titleModal={titleModal}></ModalAdd>

    <InboundDelete isOpen={isInboundDeleteOpen} onClose={() => setIsInboundDeleteOpen(false)} endpoint={endpointToSend}></InboundDelete>

    <UserDelete isOpen={isUserDeleteOpen} onClose={() => setIsUserDeleteOpen(false)} endpoint={endpointToSend}></UserDelete>

    <UserEdit isOpen={isUserEditOpen} onClose={() => setIsUserEditOpen(false)} endpoint={endpointToSend}></UserEdit>
    </>
    )
}