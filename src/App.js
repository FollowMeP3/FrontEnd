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
import SearchResults from './Components/SearchResults';

//NOTE: 
  //may have to change "/newPost" to :id and render router.props
  //haven't routed EditPost.js yet
function App() {
const initialState = {instance:'',imageUpload: ''};
const [postData, setPostData] = useState(initialState)

  return (
    <div className="App">
      <nav>
        <div className="nav-wrapper">
            <a href="/">Explore</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/posts/days">Posts and Activity</a></li>
              <li><a href="/signin">Sign in</a></li>
            </ul>
        </div>
      </nav>
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
      {/* <Route
          exact path="/:username"
          render={routerProps => (
            <SearchResult match={routerProps.match}/>
            )} /> */}
      </main>
    </div>
  );
}

export default App;
