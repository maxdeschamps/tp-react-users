import React from 'react';
import { Link } from "react-router-dom";
import ButtonDanger from './ButtonDanger';


export default function Row ({onDeleteClick, user}) {
    return (
        <tr>
            <td><img className="img-thumbnail" src={user.picture.thumbnail} alt={user.name}  /></td>
            <td>{user.firstname} {user.lastname.toUpperCase()}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.age}</td>
            <td><Link className="btn btn-info" to={"user/" + user.id}>Show</Link></td>
            <td><Link className="btn btn-outline-primary" to={"update/" + user.id}>Update</Link></td>
            <td><ButtonDanger onClick={() => onDeleteClick(user.id)}>Delete user</ButtonDanger></td>
        </tr>
    );
}
