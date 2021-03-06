import './App.css';
import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import Create from './Components/Create/Create';
import Detail from './Components/Detail/Detail';
import NavBar from './Components/NavBar/NavBar'
import NotFound from './Components/NotFound/NotFound';


function App() {
  const [ navBar, setNavBar ] = useState(true)
  const [create, setCreate] = useState(false)

  return (
    <div className="App">
      <Route path='/' render={() => <NavBar navBarFlag={navBar}/>} />
      <Switch>
      <Route path='/' exact render={() => <LandingPage handler={setNavBar}/>} />
      <Route path='/home' exact render={() => <Home create={create} setCreate={setCreate} />}/>
      <Route path='/create' exact render={() => <Create setCreate={setCreate}/>}/>
      <Route path='/detail/:id' exact component={Detail} />
      <Route path='*' component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
