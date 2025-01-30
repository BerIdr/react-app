import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Huomaa korjattu import!
import './App.css';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Layout from './components/LayOut';
import Single from './views/Single';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    <>
      <h1>My App</h1>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout/>} >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/single" element={<Single />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm/>} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
};

export default App;
