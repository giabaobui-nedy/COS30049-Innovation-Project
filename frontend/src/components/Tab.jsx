
function Tab(props) {
    return (
        <span>
            <button onClick={() => {
                props.getAssetsByCategory(props.category)}}
                type="button"
                className={props.isChosen ? "btn btn-dark rounded m-2" : "btn btn-outline-dark rounded m-2"}>{props.category}</button>
        </span>
    )
}

export default Tab;