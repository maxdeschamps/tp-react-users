import React from 'react';

export default function ButtonPrimary({children, onClick}) {
    return (
        <button className="btn btn-primary" onClick={onClick}>{children}</button>
    );
}
