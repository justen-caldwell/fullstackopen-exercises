const Filter = ({ changeHandler, currentValue }) => {
    return (
        <div>
            filter shown with <input value={currentValue} onChange={changeHandler} />
        </div>
    )
}

export default Filter
