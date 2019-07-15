import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
import Home from './containers/Home';
import CreateMovie from './containers/CreateMovie';
import CreateActor from './containers/CreateActor';
import EditMovie from './containers/EditMovie';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/movie/create" component={CreateMovie} />
        <Route path="/actor/create" component={CreateActor} />
        <Route path="/movie/edit" component={EditMovie} />
      </div>
    </Router>
  );
}

export default App;
