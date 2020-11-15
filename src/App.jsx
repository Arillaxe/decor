import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { ScrollToTop } from './Components';
import {
  About,
  Admin,
  Cart,
  Category,
  Contacts,
  Gallery,
  Home,
  Order,
  Product,
} from './Pages';
import store from './lib/store';
import products from './data';
import './App.css';

library.add(faShoppingCart, faPlus, faMinus);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/product/:type/:id">
              <Product products={products} />
            </Route>
            <Route path="/product/:type">
              <Category products={products} />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/order">
              <Order />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
