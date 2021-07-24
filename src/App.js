import './App.css'
import { Route, Link } from 'react-router-dom'
import Profile from './Components/Profile/Profile';
import Signin from './Components/Signin/Signin';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import NewPost from './Components/NewPost';
import UserFeed from './Components/UserFeed';
import Feed from './Components/MainFeed';

//NOTE: 
  //may have to change "/newPost" to :id and render router.props
  //haven't routed EditPost.js yet
function App() {
  return (
    <div className="App">
      <Link to="/newPost">Add to Day</Link>
      <Link to="/signin">Sign In</Link>
      <main>
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/signup' component={Profile} />
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/home' component={Home} />
      <Route exact path="/newPost" component={NewPost} />
      <Route exact path="/newPost" component={UserFeed} />
      <Route exact path="/" component={Feed} />
      </main>
    </div>
  );
}

export default App;
