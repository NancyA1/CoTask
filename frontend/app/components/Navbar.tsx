import Link from "next/link";


export default function Navbar(){
    return(
   <nav className="navbar">
    <Link href="/" className="mylogo">
        <img 
          src="https://api.iconify.design/carbon:id-management.svg" 
          alt="CoTask" 
        />
        <span>CoTask</span>
      </Link>
      
   <ul className="nav-links">
        <li>
          <Link href="#features">Features</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className="nav-actions">
        <Link href="/login" className="loginbtn" >Login</Link>
        <Link href="/register" className="registerbtn">Register</Link>
      </div>




   </nav>
    );
}