import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
    <>
        <nav className="navbar">
            <Link className="navbar-item" to="/" > Home </Link>
            <Link className="navbar-item" to="/subjects"> Subjects </Link>
        </nav>
    </>
    )
}

export default Navbar;