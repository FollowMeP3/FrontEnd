import './App.css'
import { Route, Link } from 'react-router-dom'
import React, { useState } from "react";
import Profile from './Components/Profile/Profile';
import Signin from './Components/Signin/Signin';
import Welcome from './Components/Welcome/Welcome';
import NewPost from './Components/NewPost';
import UserFeed from './Components/UserFeed';
import MainFeed from './Components/MainFeed';
import EditPost from './Components/EditPost';

//NOTE: 
  //may have to change "/newPost" to :id and render router.props
  //haven't routed EditPost.js yet
function App() {
const initialState = {instance:'',imageUpload: ''};
const [postData, setPostData] = useState(initialState)

  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/posts/days">Your Feed</Link>
      <Link to="/signin">Sign In</Link>
      <main>
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/signup' component={Profile} />
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/' component={MainFeed} />
      <Route exact path="/posts/days" component={UserFeed} />
      {/* <Route exact path={"posts/edit/"+postData._id} component={EditPost} /> */}
      <Route
          exact path="/posts/edit/:id"
          render={routerProps => (
            <EditPost match={routerProps.match}/>
          )} />
      </main>
    </div>
  );
}

export default App;
