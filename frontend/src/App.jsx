import './App.css';
import { Routes, Route } from 'react-router-dom';
import CaptainHome from './pages/captainHome';
import Start from './pages/Start';
import UserLogin from './pages/userlogin';
import UserSignup from './pages/userSignup';
import CaptainLogin from './pages/captainLogin';
import CaptainSignup from './pages/captainSignup';
import Home from './pages/Home';
import UserProtectedWrapper from './pages/UserProtectedWrapper';  
import UserLogout from './pages/userLogout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/usersignup" element={<UserSignup />} />
      <Route path="/captain/login" element={<CaptainLogin />} />
      <Route path="/captainsignup" element={<CaptainSignup />} />
      <Route path="/home" element={
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
      } />
      <Route path="/captain/home" element={
        <UserProtectedWrapper>
          <CaptainHome />
        </UserProtectedWrapper>
      } />
      <Route path="/logout" element={<UserLogout />} />
    </Routes>
  );
}

export default App;
