import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Page from './components/Page/Page';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Page}/>
        <Route  path='/login' component ={Login}/>
        <Route  path='/sign-up' component ={SignUp}/>
      </Switch>
    </Router>
  );
}

export default App;
