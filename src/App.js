import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Dashboard from "./pages/Dashboadr/Dashboard";


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products'>
          <Products />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
