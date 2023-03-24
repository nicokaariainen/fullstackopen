const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Numbers = ({ persons, filter }) => {
    var filteredPersons = persons.filter(person => person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()))
  
    return (
      <div>
        {filteredPersons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    )
  }

export default Numbers