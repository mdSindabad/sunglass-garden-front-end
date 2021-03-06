import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductsProvider from "./contexts/ProductsProvider";
import Purchase from "./pages/Purchase/Purchase";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/products'>
              <Products />
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path='/purchase/:id'>
              <Purchase />
            </PrivateRoute>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
