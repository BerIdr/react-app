import {useContext} from 'react';
import {UserContext} from '../contexts/userContext';

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('userUserContext must be used within an UserProvider');
  }

  return context;
};

export {useUserContext};
