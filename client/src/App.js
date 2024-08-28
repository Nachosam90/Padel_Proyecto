import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={ProductListPage} />
          <Route path="/palas/:id" component={ProductDetailPage} />
        </Switch>
      </Router>
    </ProductProvider>
  );
}


export default App;
