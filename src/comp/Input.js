import React from 'react';

export default function Input({children, onChange, value, type = "text"}) {
    return (
        <label className="form-label">{children}
            <input type={type} className="form-control" placeholder={children} onChange={(e) => onChange(e.target.value)} value={value || ''}/>
        </label>
    );
}
