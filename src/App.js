import React, { createContext, useState } from 'react';

import './App.css';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import Login from './Components/Login/Login';
import Hotel from './Components/Hotel/Hotel';
import NoMatch from './Components/NoMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, SetLoggedInUser] = useState({});

  // const { placeId } = useParams();

  return (
    <UserContext.Provider value={[loggedInUser, SetLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route path='/place-details/:placeId'>
            <PlaceDetails />
          </Route>
          <PrivateRoute path='/hotel-details'>
            <Hotel />
          </PrivateRoute>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='*'>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
