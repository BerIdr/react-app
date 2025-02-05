import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
