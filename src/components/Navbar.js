import { NavLink } from 'react-router-dom'
import '../navbar.css'
import './Sprints/SelectSprint'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements">
          <ul>
          <li>
              <NavLink to="/pbis">Pbi List</NavLink>
            </li>
            <li>
              <NavLink to="/sprints">Sprint List</NavLink>
            </li>
            <li>
              <NavLink to="/users">User List</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar