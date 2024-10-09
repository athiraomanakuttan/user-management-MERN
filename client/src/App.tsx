import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/signup"  element={
          <PrivateRoute>
            <SignUp />
          </PrivateRoute>
        } 
      />
    <Route path='/profile' element={
      <PrivateRoute>
        <Profile/>
      </PrivateRoute>
    }/>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
