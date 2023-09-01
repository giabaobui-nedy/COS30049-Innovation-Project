
function Tab(props) {
    function handleClick() {
        props.setChosenCategory(props.category)
    }
    return (
        <span>
            <button onClick={handleClick} type="button" className={props.isChosen? "btn btn-dark rounded m-2" : "btn btn-outline-dark rounded m-2"}>{props.category}</button>
        </span>
    )
}

export default Tab;