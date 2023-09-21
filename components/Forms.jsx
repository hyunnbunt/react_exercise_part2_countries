const PersonForm = (props) => {
    return (
        <form id={props.newName}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button onClick={props.addName} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm