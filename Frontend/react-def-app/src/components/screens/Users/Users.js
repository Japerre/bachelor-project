import {Link} from "react-router-dom";

const Users = ({ users }) => {

    return(
        <main>
            <h1>Users</h1>
            <Link to="/users/createUser" className="ui-button">ADD USER</Link>
            { users.map((user) =>(
                <div className="user-preview" key={user.userId}>
                    <p>Username: { user.userName }</p>
                    <p>Role: { user.role }</p>
                </div>
            ))}
        </main>
    )
}
export default Users