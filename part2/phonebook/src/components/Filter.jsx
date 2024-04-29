const Filter = ({ changeHandler, currentValue }) => {
    return (
        <div>
            <p>filter shown with <input value={currentValue} onChange={changeHandler} /></p>
        </div>
    )
}

export default Filter
