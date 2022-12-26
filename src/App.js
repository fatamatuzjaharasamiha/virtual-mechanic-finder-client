import './App.css';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import ProviderSignup from './Pages/Authentication/Signup/ProviderSignup';
import CustomerSignup from './Pages/Authentication/Signup/CustomerSignup';
import Login from './Pages/Authentication/Login/Login';

function App() {
  return (
    <div className=" font-[poppins]">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
       
        <Route path='/customersignup' element={<CustomerSignup />}></Route>
        <Route path='/providersignup' element={<ProviderSignup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
