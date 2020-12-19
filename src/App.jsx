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
  faTimes,
  faAsterisk,
  faTrash,
  faBars,
  faChevronDown,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ScrollToTop } from './Components';
import {
  About,
  Cart,
  Category,
  Contacts,
  Discounts,
  Gallery,
  Home,
  Order,
  Product,
} from './Pages';
import { 
  Orders as AdminOrders,
  Login as AdminLogin,
  AddProduct as AdminProduct,
  AddCategory as AdminCategory,
  AddHomeGrid as AdminHomeGrid,
  Reviews as AdminReviews,
  Gallery as AdminGallery,
  EditProduct as AdminEditProduct,
} from './Pages/Admin/components';
import store from './lib/store';
import './App.css';

library.add(
  faShoppingCart,
  faPlus,
  faMinus,
  faTimes,
  faAsterisk,
  faTrash,
  faBars,
  faChevronDown,
  faCheck,
);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product/:type/:id" component={Product} />
            <Route path="/product/:type" component={Category} />
            <Route path="/about" component={About} />
            <Route path="/cart" component={Cart} />
            <Route path="/discounts" component={Discounts} />
            <Route path="/order" component={Order} />
            {/* <Route path="/contacts" component={Contacts} /> */}
            <Route path="/gallery" component={Gallery} />
            <Route path="/admin" exact component={AdminOrders} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/product/:id" component={AdminEditProduct} />
            <Route path="/admin/product" component={AdminProduct} />
            <Route path="/admin/category" component={AdminCategory} />
            <Route path="/admin/homeGrid" component={AdminHomeGrid} />
            <Route path="/admin/reviews" component={AdminReviews} />
            <Route path="/admin/gallery" component={AdminGallery} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
