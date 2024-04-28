const Persons = ({ persons, deleteFunc }) => {
    return (
        <div>
            {persons.map(person => 
                <li key={person.id}>
                    <p>{person.name} {person.number} <button onClick={() => deleteFunc(person.id)}>delete</button></p>
                </li>
            )}
        </div>
    )
}

export default Persons
