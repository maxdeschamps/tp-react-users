import React, { useContext, useState } from 'react';
import Table from '../comp/Table';
import Header from '../comp/Header';
import { userContext, filterContext, fetchUsers } from '../App';

export default function Home() {
    const {users, setUsers} = useContext(userContext);
    const [search, setSearch] = useState();
    const [gender, setGender] = useState("");

    const [sort, setSort] = useState({key: '', asc: true});
    
    const handleFetchClick = () => {
        fetchUsers().then((newUsers) => { setUsers((oldUsers) => ([...oldUsers, ...newUsers]))});
    }

    const handleResetClick = () => {
        setSearch();
        setGender("");
    }

    const handleDeleteClick = (userID) => {
        setUsers(oldUsers => oldUsers.filter(user => user.id !== userID));
    }
    
    const usersFiltered = users.filter(user => {
        const filterGender = gender ? (user.gender === gender.toLowerCase()) : true;
        const filterSearch = search ? ((user.firstname).toLowerCase().startsWith(search.toLowerCase()) || (user.lastname).toLowerCase().startsWith(search.toLowerCase())) : true;

        return filterGender && filterSearch;
    }).sort((user1, user2) => { 
        if (sort.key === '') {
            return 0;
        }

        const valueUser1 = user1[sort.key];
        const valueUser2 = user2[sort.key];

        return (valueUser1 > valueUser2) 
            ? sort.asc ? 1 : -1 
            : sort.asc ? -1 : 1;
    });

    return (
        <span>
            <filterContext.Provider value={{search, setSearch, gender, setGender}}>
                <Header onFetchClick={handleFetchClick} onResetClick={handleResetClick} count={{nbUsers: users.length, nbFiltered: usersFiltered.length}} />
            </filterContext.Provider>
            { usersFiltered.length 
                ? <Table onDeleteClick={handleDeleteClick} users={usersFiltered} sort={sort} onSortChange={setSort} />
                : <div className="alert alert-warning"><p>No user</p></div>
            }
        </span>
    );
}