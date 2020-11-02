import React, { useContext } from 'react';
import { userContext } from '../App';
import { Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function User() {
    const {users} = useContext(userContext);

    const { id } = useParams();
    const user = users.find(user => user.id === id);

    if (user) {
        return (
            <span>
                <div className="row">
                    <div className="col-sm-12 col-md-2">
                        <img className="img-fluid" src={user.picture.large} alt={user.name} style={{width: '100%'}}  />
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <h1>{user.firstname} {user.lastname}</h1>
                        <p>@{user.username}</p>
                        <p>{user.email} | {user.phone} | {user.gender}</p>
                        <p>{new Date(user.birthday).getDate()}/{new Date(user.birthday).getMonth()}/{new Date(user.birthday).getFullYear()}</p>
                        <p><Link className="btn btn-outline-primary" to={"/update/" + user.id}>Update</Link></p>
                    </div>
                </div>
            </span>
        );
    } else {
        return (
            <Redirect to={{ pathname: "/", state: { from: user } }} />
        );
    }
}

