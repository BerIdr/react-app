import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';
import {Link, Outlet} from 'react-router-dom';

// jos käyttäjää ei ole, kutsu handleAutoLogin()
const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    if (!user) {
      try {
        handleAutoLogin();
      } catch (e) {
        console.log((e as Error).message);
      }
    }
  }, []);
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
