import React, { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import Table from "../../components/Table";
import { Link, useNavigate } from "react-router-dom";

export default function User() {
    const [User, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/user", {
            headers: {  
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            }
        })
        .then(res => {
            setUser(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login !!'));
            }
        })
    }, []);

    const headers = [
        "#",
        "username",
        "email",
        "password",
        "role"
    ];
    
    const endpointModal = {
        "createUser": "http://localhost:8000/user",
        "UserDelete":"http://localhost:8000/user/{id}",
        "UserDetail":"http://localhost:8000/user/{id}",
        "UserEdit": "http://localhost:8000/user/{id}"
    };

  
    const title = "User";

    const columnIdentitasDelete = 'username'; // Adjust according to your data

    const buttons = [
        "createUser",
        "UserDelete",
        "UserDetail",
        "UserEdit"
    ];

    const tdColumn = {
        "username": null,
        "email": null,
        "password": null,
        "role": null
    };
    
    const inputData = {
        "username" : {
            "tag": "input",
            "type": "text",
            "option": null,
        },
        "email" : {
            "tag": "input",
            "type": "text",
            "option": null,
        },
        "password" : {
            "tag": "input",
            "type": "password",
            "option": null,
        },
        "role" : {
            "tag": "select",
            "type": "select",
            "option": ["admin", "stuff"],
        },
    }

    // const UrlImage = "http://localhost:8000/upload-images"

    return (
        <Case>
            <div className="relative overflow-x-auto shadow-md px-20 py-10">
                <div className="flex justify-end">
                        <Link to="/user-create" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg">create</Link>  
                </div>
            </div>
            <Table headers={headers} data={User} endpoint={endpointModal}  titleModal={title}
                identitasColumn={columnIdentitasDelete} opsiButton={buttons} columnForTd={tdColumn} inputData={inputData}>
            </Table>
            
        </Case>
        
    );
}