import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faShoppingCart,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { ScrollToTop } from './Components';
import { Home, Product } from './Pages';
import products from './data';
import './App.css';

library.add(fab, faShoppingCart, faPlus, faMinus);

const App = () => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact>
            <Home products={products} />
          </Route>
          <Route path="/product/:type/:id">
            <Product products={products} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
