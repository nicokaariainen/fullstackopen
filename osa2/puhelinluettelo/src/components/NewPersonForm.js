const NewPersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) =>
    <form>
      <div>
        name: <input 
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>

export default NewPersonForm