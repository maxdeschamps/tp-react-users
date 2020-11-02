import React, { useContext }  from 'react';
import ButtonPrimary from './ButtonPrimary';
import Input from './Input';
import Select from './Select';
import {filterContext} from '../App';

export default function Header({onFetchClick, onResetClick, count}) {
    const {search, setSearch, gender, setGender} = useContext(filterContext);
    return (
        <header>
            <h1>Users</h1>
            <hr/>
            <ButtonPrimary onClick={onFetchClick}>Fetch users</ButtonPrimary>
            <span> {count.nbFiltered} / {count.nbUsers} users</span>
            <br/> 
            <Input type="search" onChange={setSearch} value={search} >Filter users by name</Input>
            <span> </span> 
            <Select onSelect={setGender} value={gender} choices={[{key:"", label:"All"}, {key:"male", label:"Male"}, {key:"female", label:"Female"}]} >Filter users by gender</Select>
            <span> </span>
            <ButtonPrimary onClick={onResetClick}>Reset filters</ButtonPrimary>
            <hr/>
        </header>
    );
}