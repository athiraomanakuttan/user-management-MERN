import { Routes,Route } from 'react-router-dom'
import SignUp  from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
function App() {

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  )
}

export default App
