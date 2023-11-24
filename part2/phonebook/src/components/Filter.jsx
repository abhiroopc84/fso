import Persons from "./Persons"

const Filter = ({filter, filterByName}) => {
    
    return (
        <>
        filter shown with
        <input value={filter} onChange={filterByName}/>
        </>
    )
}

export default Filter