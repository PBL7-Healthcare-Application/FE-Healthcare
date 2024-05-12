import ItemUser from "./ItemUser"
import "./List.scss"

const ListUser = () => {
    return (
        <div className='listUser'>
            <span className="listUser-font">List Messages</span>
            <div className="listUser-list">
                <ItemUser />
                <ItemUser />
            </div>
        </div>
    )
}

export default ListUser