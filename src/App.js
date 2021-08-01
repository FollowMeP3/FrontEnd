import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Login from './components/Login'
import Test from './components/Test'
import Users from './components/Users'
import LoggedIn from './components/LoggedIn'
import Logout from './components/Logout'
import Posts from './components/Posts'
import CreatePost from './components/CreatePost'


export const UserContext = createContext()

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if(token == null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenResponse = await axios.post('http://localhost:5000/tokenIsValid',
      null,
      {headers: {"auth-token": token}})

      console.log(tokenResponse.data)

      if(tokenResponse.data) {
        const userResponse = await axios.get('http://localhost:5000/profile', 
        {headers: {'auth-token': token}}
        )
        setUserData({
          token: token,
          user: userResponse.data
        })
      }
    }
    isLoggedIn()
  }, [])

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem("auth-token", "")
    window.location='/login'
  }
  console.log(userData.user)
  return (

    <Router>  
      <UserContext.Provider value={{ userData, setUserData }}>
      {userData.user ? 
      ( 
        <nav>
          <Link to={'/'}>Users ({userData.user.name})</Link>
          <br></br>
          <Link to={'/logout'} onClick={logout}>Logout</Link>
          <br></br>
          <Link to={'/posts/days'}>Posts</Link>
          <br></br>
          <Link to={'/posts/newpost'}>Create Post</Link>
        </nav> 
      ) :
      (
        <nav>
          <Link to={'/login'}>Login</Link>
          <br></br>
          <Link to={'/register'}>Register</Link>
        </nav>
      )}
      <Route path="/register" exact component={Test}/>
      <Route path="/" exact component={Users}/>
      <Route path='/login' exact component={Login}/>
      {/* <Route path='/logout' exact component={Logout}/> */}
      <Route path='/loggedIn' exact component={LoggedIn}/>
      <Route path='/posts/days' exact component={Posts}/>
      <Route path='/posts/newpost' exact component={CreatePost}/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
