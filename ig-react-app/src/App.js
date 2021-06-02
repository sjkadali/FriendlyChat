import './styles/App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected.route';

const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/sign-up'));
const NotFound = lazy(() => import ('./pages/not-found'));
const Dashboard = lazy(() => import ('./pages/dashboard'));


function App() {    
  const { user } = useAuthListener();
  
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </ProtectedRoute>
          <Route path={ROUTES.LOGIN} component={Login} exact/>
          <Route path={ROUTES.SIGN_UP} component={SignUp} exact/>
          <Route component={NotFound}  />
        </Switch>
        </Suspense>
      </Router>
      </UserContext.Provider>    
  );
}

export default App;
