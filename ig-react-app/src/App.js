import './styles/App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/sign-up'));
const NotFound = lazy(() => import ('./pages/not-found'));
const Dashboard = lazy(() => import ('./pages/dashboard'));


function App() {    
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path={ROUTES.DASHBOARD} component={Dashboard}  exact/>
        <Route path={ROUTES.LOGIN} component={Login} exact/>
        <Route path={ROUTES.SIGN_UP} component={SignUp} exact/>
        <Route component={NotFound}  />
      </Switch>
      </Suspense>
    </Router>    
  );
}

export default App;
