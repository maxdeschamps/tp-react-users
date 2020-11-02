import React from 'react';
import Row from './Row';

export default function Table({onDeleteClick, users, sort, onSortChange}) {
        
    const getSortOrder = (key)  => {
        if (sort.key !== key) {
            return '';
        }

        return sort.asc ? 'asc' : 'desc';
    }

    const handleSortChange = (key) => {
        onSortChange(oldSort => {
            if (oldSort.key !== key) {
                return {key, asc: true};
            }

            if (oldSort.asc) {
                return {key, asc: false};
            }

            return {key: '', asc: true};
        })
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th onClick={() => handleSortChange('lastname')}>Name
                        <IconSort order={getSortOrder('lastname')} />
                    </th>
                    <th onClick={() => handleSortChange('email')}>Email
                        <IconSort order={getSortOrder('email')} />
                    </th>
                    <th>Phone</th>
                    <th onClick={() => handleSortChange('age')}>Age
                        <IconSort order={getSortOrder('age')} />
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map( user => <Row user={user} onDeleteClick={onDeleteClick} key={user.id} />)}
            </tbody>
        </table>
    );
}

const IconSort = ({order}) => (
    <svg style={{width: '1rem', height: '1rem', marginLeft: '2px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <IconPath order={order} />
    </svg>
)

const IconPath = ({order}) => {
    if (order === 'asc') {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />;
    } else if (order === 'desc') {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />;
    } else {
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />;
    }
}