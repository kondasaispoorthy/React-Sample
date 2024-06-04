import React from "react";
import { Link } from 'react-router-dom';
function Navbar() {
    return (
    <nav className="navbar">
  <h4 className="navbar-heading">Student Management System</h4>
  <ul className="nav-list">
    <li className="nav-item"><Link to="/">Home</Link></li>
    <li className="nav-item"><Link to="/add">Student Form</Link></li>
  </ul>
</nav>
    )
  }


// Previously Used Components
/*<li className="nav-item"><Link to="/">Home</Link></li> 
<li className="nav-item"><Link to="/addstudent">Add Student</Link></li>
<li className="nav-item"><Link to="/addstudents">Adding Sample</Link></li> */


  
export default Navbar;
