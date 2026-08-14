import Link from "next/link";

export default function LoginPage(){

    return (
 <div className="login-page">
    <div  className="header1">
     <h1>CoTask</h1>
    <img src="https://api.iconify.design/carbon:id-management.svg"
    alt="CoTask"
    /> 

    </div>
    
     <div className="login-content">
     <h2>Welcome back</h2>
     <form>
       <div className="form-field email-field">
        <label htmlFor="email">Email</label>
        <input type="email"  id="email" placeholder="Enter your email" required/>
       </div>
       <div className="form-field password-field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />

       </div>
       <button type="submit" id="mybtn"> Sign In</button>
       </form>
       <p>Don't have an account? <Link id="register" href={"/register"}>Register Now</Link> </p>
       {/* <button type="submit" id="register-btn" >Register Now</button> */}
      
     </div>

    </div>




    );
}