import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <>
      {displayRegister ? (
        <RegisterForm />
      ) : (
        <LoginForm toggleRegister={toggleRegister} />
      )}
      <button
        className="my-[10px] cursor-pointer rounded-[5px] bg-stone-500 p-[10px] hover:bg-stone-950 hover:text-white"
        onClick={toggleRegister}
      >
        Go back
      </button>
    </>
  );
};

export default Login;
