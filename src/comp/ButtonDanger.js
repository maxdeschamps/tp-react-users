import React from 'react';

export default function ButtonDanger({children, onClick}) {
    return (
        <button className="btn btn-danger" onClick={onClick}>{children}</button>
    );
}
