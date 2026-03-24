import React, { useState } from 'react'
import "../CSS_Styles/./register.css"
import { Link } from 'react-router-dom'

function Register() {
    const [err,setErr] = useState(false)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    let onHandleRegister = async (event)=>{
        event.preventDefault()

        let data = await fetch(`${import.meta.env.VITE_API_URL}/users?email=${email}`)
        let res_data = await data.json()
        if (res_data.length>0){
            setErr(true)
        }
        else{
                const userDetails = {username,email,password}

                try {
                    let res = await fetch("https://react-main-project-1.onrender.com/users",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(userDetails)
                })

                if (res.ok){
                    console.log("Successfully Registered")
                    setErr(false)
                }
                } catch (error) {
                    console.log(error)
                    
                }
        }

       

    }


  return (
        <div className='Parent_register'>
            <form action="" onSubmit={onHandleRegister}>
                <label htmlFor="user">Username </label><br />
                <input type="text" id="user" required placeholder='Enter Username' onChange={()=>setUsername(event.target.value)}/><br /><br />
                <label htmlFor="emi">Email </label><br />
                <input type="text" id ="emi"required placeholder='Enter Email' onChange={()=>setEmail(event.target.value)} /><br /><br />
                <label htmlFor="pass">Password  </label><br />
                <input type="text" id="pass" required placeholder='Enter Password' onChange={()=>setPassword(event.target.value)}/><br /><br />
                <p>Already Have an Account? <Link to={"/"} >Login</Link></p>
                {err?<p style={{color:"red"}}>**Email is Already Registered</p>:""}
                <button>Sign up</button>
            </form>
    </div>
  )
}

export default Register