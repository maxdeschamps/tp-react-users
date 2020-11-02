import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from './comp/Container';
import Home from './pages/Home';
import User from './pages/User';
import UserUpdate from './pages/UserUpdate';
import Axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const fetchUsers = async(maxUsers = 10) => {
    try {
        const { data: {results} } = await Axios.get('https://randomuser.me/api/?results=' + maxUsers); 
        
        return results.map(result => (
        {
            id: result.login.uuid,
            username: result.login.username,
            firstname: result.name.first, 
            lastname: result.name.last, 
            picture: {
                thumbnail: result.picture.thumbnail,
                large: result.picture.large
            },
            phone: result.phone,
            email: result.email, 
            gender: result.gender,
            birthday: result.dob.date,
            age: result.dob.age
        }
        ));
    } catch(e) {
        console.error(e);
        return [];
    } finally {
        // alert('Requête effectuée');
    }
}

export const userContext = React.createContext();
export const filterContext = React.createContext();

export default function App() {
    const [users, setUsers] = useState(() => localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []);

    useEffect(() => {
        const usersStorage = localStorage.getItem('users');
        if (!usersStorage || !JSON.parse(usersStorage).length) {
            fetchUsers(5).then((newUsers) => setUsers(oldUsers => [...oldUsers, ...newUsers]));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    return (
        <Router>
            <Container>
                <userContext.Provider value={{users, setUsers}}>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>

                        <hr />
                        
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/user/:id">
                                <User />
                            </Route>
                            <Route path="/update/:id">
                                <UserUpdate />
                            </Route>
                        </Switch>
                    </div>
                </userContext.Provider>
            </Container>
        </Router>
    );
}
