import { Routes,Route } from 'react-router-dom'
import SignUp  from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
function App() {

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
  )
}

export default App
