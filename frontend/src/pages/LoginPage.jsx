import { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import useClient from "../config/useClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'

function LoginPage() {
  const [onLogIn, setOnLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useClient()
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)

  const cookies = new Cookies()

  const loginAccount = async (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    try {
      const response = await client.post('/auth/users/login', {username, password})
      if (response.status === 200 && response.data) {
        // localStorage.setItem('access_token', response.data.access)
        // localStorage.setItem('refresh_token', response.data.refresh)
        cookies.set('access_token', response.data.access, {
          expires: new Date(response.data.access_exp * 1000)
        })
        cookies.set('refresh_token', response.data.access, {
          expires: new Date(response.data.refresh_exp * 1000)
        })
        setIsAuthenticated(true)
        navigate('/')
        
      }
      if (response.status === 202) {
        console.log(response.data)
        alert('Login fail...')
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <div className="flex justify-center xl:justify-evenly items-center m-auto w-full h-[650px]">
        <div className="hidden gif-fram w-[800px] h-[500px] overflow-hidden xl:flex justify-center items-center rounded-2xl">
          <img src="https://i.pinimg.com/originals/b9/cb/7f/b9cb7fb9d718cc3e74e1ef05ccfd709a.gif" width='800px' alt="" />
        </div>
        <div className="login-container w-[300px] mt-4">
          <h1 className="text-[32px] font-bold leading-none m-0 w-full text-center">Join with us!</h1>
          <div><button className="w-[300px] h-10 px-3 mt-4 rounded-[20px] bg-black text-white leading-none">Google</button></div>
          <div><button className="w-[300px] h-10 px-3 mt-4 rounded-[20px] bg-black text-white leading-none">Facebook</button></div>
          <div className="w-[300px] relative flex flex-col justify-center mt-4">
            <p className="absolute right-[50%] bg-white leading-none rounded-sm z-10 px-1 font-semibold">Or</p>
            <hr />
          </div>
          <form onSubmit={e => loginAccount(e)} className={`login-form-container ${onLogIn ? '' : 'hidden'}`}
          >
            <div class="relative mt-4">
              <input 
                type="text" 
                id="floating_outlined" 
                required value={username} onChange={e => setUsername(e.target.value)}
                class="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email or Username</label>
            </div>
            <div class="relative mt-4">
              <input 
                type="text" 
                id="floating_outlined" 
                required value={password} onChange={e => setPassword(e.target.value)}
                class="block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="floating_outlined" class="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
            </div>
            <button type="submit" className="w-[300px] h-10 px-3 mt-4 rounded-[20px] leading-none border-2 border-black bg-black text-white ">Sign in</button>
            <button type="button" className="w-[300px] h-10 px-3 mt-4 rounded-[20px] leading-none border-2 border-black hover:bg-black hover:text-white">Forgot password?</button>
            <div className="flex mt-10 gap-1">
              <p className="text-gray-400 m-0">Don't have an account?</p>
              <button type="button" className="p-0 m-0 text-green-400 font-semibold hover:text-green-500"
                onClick={() => setOnLogin(!onLogIn)}
              >Sign up</button>
            </div>
          </form>
          <div className={`register-form-container ${!onLogIn ? '' : 'hidden'}`}>
            <button className="w-[300px] h-10 px-3 mt-4 rounded-[20px] leading-none border-2 border-black hover:bg-black hover:text-white">Create New Account</button>
            <div className="flex mt-10 gap-1">
              <p className="text-gray-400 m-0">Have an account already?</p>
              <button className="p-0 m-0 text-green-400 font-semibold hover:text-green-500"
                onClick={() => setOnLogin(!onLogIn)}
              >Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
