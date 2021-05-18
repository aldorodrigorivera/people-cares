import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Pacients from './pages/Pacients';
import Reservations from './pages/Reservations';
import Auth from './guards/Auth';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login}/>
            <Auth>
              <Route exact path="/pacientes" component={Pacients}/>
              <Route exact path="/reservaciones" component={Reservations}/>
            </Auth>
            <Route exact path="*" component={NotFound}/>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
