import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Home } from './Pages';
import './App.css';

library.add(fab, faShoppingCart);

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
