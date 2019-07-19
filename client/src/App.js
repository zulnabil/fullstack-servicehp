import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

// import PrimarySearchAppBar from './components/AppBar'
import WithAuth from './components/WithAuth'
import TemporaryDrawer from './components/TemporaryDrawer'
import BottomNav from './components/BottomNav'
import ListItem from './components/list_item/ListItem'
import AddItem from './components/add_item/AddItem'
import EditItem from './components/edit_item/EditItem'
import LoginForm from './components/login'
import PrintPOS from './components/PrintPOS'
import MiddleWare from './components/MiddleWare'

function App() {
  return(
    <div className="App">
      <Router>
        <div>
          <TemporaryDrawer />
          <BottomNav />
          <Route path="/" exact component={ListItem} />
          <Route path="/add" component={AddItem} />
          <Route path="/edit/:id" component={EditItem} />
          <Route path='/login' component={LoginForm} />
          <Route path='/print/:id' component={PrintPOS} />
          <Route path='/middleware' component={MiddleWare} />

          {/* <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} /> */}
        </div>
      </Router>
    </div>
  )
}

export default App;
