import Person from "./Person"

const Persons = ({personsToShow, deletePerson}) => {
    return (
        <>
        {personsToShow.map((person) => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}
        </>
    )
}

export default Persons