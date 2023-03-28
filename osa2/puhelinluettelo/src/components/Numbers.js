const Person = ({ person, deletePerson }) => <p>{person.name} {person.number} <Button text="delete" onClick={() => deletePerson(person.id)} /></p>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Numbers = ({ persons, filter, deletePerson }) => {
    var filteredPersons = persons.filter(person => person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()))
  
    return (
      <div>
        {filteredPersons.map(person =>
          <Person key={person.name} person={person} deletePerson={deletePerson}/>
        )}
      </div>
    )
  }

export default Numbers