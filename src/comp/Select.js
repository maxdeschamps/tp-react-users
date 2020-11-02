import React from 'react';

export default function Select({children, choices, onSelect, value}) {
    return (
        <label>{children}
            <select onChange={(e) => onSelect(e.target.value)} value={value} className="form-control">
                {choices.map( ({key, label}) => <option value={key} key={key}>{label}</option> )}
            </select>
        </label>
    );
}
