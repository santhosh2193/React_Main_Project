import React, { useState } from 'react'
import '../CSS_Styles/login.css'
import Products from "./products"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const[login,setLogin] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onHandleSubmit = async (event)=>{
            event.preventDefault()
            try {
              
              let data = await fetch(`https://react-main-project-1.onrender.com/users?email=${email}`,{
                method:"GET"
              })
              let res = await data.json()



              if (res.length==0){
                    setLogin(true)
                }
              else{

                if (res[0].password === password){
                      console.log("succesfully login")
                      localStorage.setItem("user_login",res[0].id)
                      setLogin(false)
                      navigate("/products")


                    }
                    else{
                      setLogin(true)
                    }
              }



            } catch (error) {
                console.log(error)
            }
    }

  return (
        <>
            <div className='Parent_login'>
              <form action="" onSubmit={onHandleSubmit}>
                  <label htmlFor="user">Email: </label><br />
                  <input type="email" id="user" required placeholder='Enter Email' onChange={(event)=>setEmail(event.target.value)} /><br /><br />
                  <label htmlFor="pass">Password: </label><br />
                  <input type="text" id="pass" required placeholder='Enter Password' onChange={(event)=>setPassword(event.target.value)} /><br /><br />
                  <p>Create Account ? <Link to="/register">Register</Link></p>
                  {login?<p style={{color:"red"}}>**Invalid Credentials</p>: "" }
                  <button>Login</button>
              </form>
          </div>
        </>
  )
}

export default Login