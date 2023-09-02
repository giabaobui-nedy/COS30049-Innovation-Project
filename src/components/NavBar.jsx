import Tab from "./Tab";

function NavBar(props) {
    const categories = ["All", "Art", "Gaming", "Membership", "PFPs", "Photography", "Music"]
    return (
        <div className="container">
            <h3>Categories</h3>
            <hr></hr>
            {categories.map(category => {
                return <Tab setChosenCategory={props.setChosenCategory} isChosen={props.chosenCategory === category} key={category} category={category} />
            })}
        </div>
    )
}

export default NavBar;