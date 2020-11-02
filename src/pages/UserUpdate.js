import React, { useContext } from 'react';
import { userContext } from '../App';
import { Redirect, useParams } from "react-router-dom";
import Input from '../comp/Input';
import Select from '../comp/Select';
import DatePicker from 'react-date-picker';

export default function UserUpdate() {
    const {users, setUsers} = useContext(userContext);

    const { id } = useParams();
    const user = users.find(user => user.id === id);

    const calculateAge = (birthday) => { 
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const changeValue = (key, value) => {
        user.key = value;

        for (const [userKey] of Object.entries(user)) {
            if (userKey === key) {
                Object.defineProperty(user, key, {
                    value: value,
                });
                if (key === 'birthday') {
                    Object.defineProperty(user, 'age', {
                        value: calculateAge(new Date(value))
                    })
                }
            }
        }

        const usersChanged = users.map((usr) => (usr.id === id) ? user : usr );
        setUsers(usersChanged);
    }

    if (user) {
        return (
            <form>
                <div className="row">
                    <div className="col-sm-12 col-md-2">
                        <img className="img-fluid" src={user.picture.large} alt={user.name} style={{width: '100%'}}  />
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <h1>Update {user.firstname} {user.lastname}</h1>
                        <Input onChange={(value) => {changeValue('firstname', value)}} value={user.firstname}>FirstName</Input>
                        <span> </span>
                        <Input onChange={(value) => {changeValue('lastname', value)}} value={user.lastname}>LastName</Input>
                        <br/>
                        <Input onChange={(value) => {changeValue('username', value)}} value={user.username}>Username</Input>
                        <br/>
                        <Input type="mail" onChange={(value) => {changeValue('email', value)}} value={user.email}>Email</Input>
                        <span> </span>
                        <Input type="tel" onChange={(value) => {changeValue('phone', value)}} value={user.phone}>Phone</Input>
                        <span> </span>
                        <Select choices={[{key:"male", label:"Male"}, {key:"female", label:"Female"}]} onSelect={(value) => {changeValue('gender', value)}} value={user.gender}>Gender</Select>
                        <br/>
                        <label>Birthday
                            <DatePicker onChange={(value) => {changeValue('birthday', value)}} value={new Date(user.birthday)} />
                        </label>
                    </div>
                </div>
            </form>
        );
    } else {
        return (
            <Redirect to={{ pathname: "/", state: { from: user } }} />
        );
    }
}
