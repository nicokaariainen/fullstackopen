const CountrySearch = ({searchTerm, setSearchTerm}) => {
    return (
      <div>
        find countries <input 
        onChange={(event) => setSearchTerm(event.target.value)}
        value={searchTerm}/>
      </div>
    )
  }

export default CountrySearch