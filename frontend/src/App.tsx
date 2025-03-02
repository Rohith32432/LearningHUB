
import './App.css'

import { Route, Routes } from 'react-router-dom'
import AppSidebar from './components/Sidebar'
import Form from './components/Form'
import {Toaster} from 'react-hot-toast'
import UserContext, { useAuth } from './Context/userContext'
import Layout from './pages/Layout'
import SignupForm from './components/SignupForm'
import LandingPage from './pages/LandingPage'
import Forgot from './components/Forgot'
import Forgotpassword from './components/Forgotpassword'

function App() {
  return (
    <>

            <UserContext>
      <div className='bg-Cbackground min-h-dvh '>

        <div className='flex'>
          <div>
              <AppSidebar />
          </div>
          <div className='flex-1 w-full  m-1 h-max overflow-hidden'>
          
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
                <Route path='/login' element={<Form/>}/>
                <Route element={<Form  type="instructors"/>} path='/instlogin'></Route>
                <Route path='/signup' element={<SignupForm />}/>
                <Route path='/forgot' element={<Forgot />}/>
                <Route path='/forgot/:token' element={<Forgotpassword />}/>                
                <Route element={<SignupForm  type="instructors"/>} path='/instsignup'></Route>
            </Routes>
           <Layout/>

          </div>
        </div>
      </div>
</UserContext>

            <Toaster />
    </>
  )
}

export default App
