import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LoggedIn from './components/LoggedIn';
import ForgetPassword from './components/ForgetPassword';
import NewPassword from './components/NewPassword';

import {Toaster} from 'react-hot-toast';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';

const App = () => {

  return (
    <div className='bg-slate-500 min-w-full min-h-screen flex justify-center items-center'>
      <div><Toaster/></div>

      <div className='border-2 border-slate-700 rounded-2xl shadow-2xl lg:min-w-[30rem] p-2'>

        <Router>

          <Routes>

            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/logged' element={<LoggedIn/>} />
            <Route path='/forget' element={<ForgetPassword/>} />
            <Route path='/newpassword/*' element={<NewPassword/>} />

            <Route path='/*' element={<NotFoundPage/>} />

          </Routes>

        </Router>

      </div>

    </div>
  )
}

export default App