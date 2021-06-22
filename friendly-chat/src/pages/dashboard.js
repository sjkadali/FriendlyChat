import { useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import UserContext from '../context/user';

export default function Dashboard() {
  const { user: loggedInUser} = useContext(UserContext);
  const { user, setActiveUser } = useUser(loggedInUser?.uid);
  console.log("user, loggedInUser:" , user, loggedInUser);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);
    
  return (
    <LoggedInUserContext.Provider value={{user, setActiveUser }}>
      <div className="bg-gray-primary">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};