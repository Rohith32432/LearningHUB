
import './App.css'

import { Route, Routes } from 'react-router-dom'
import AppSidebar from './components/Sidebar'
import Form from './components/Form'
import {Toaster} from 'react-hot-toast'
import UserContext, { useAuth } from './Context/userContext'
import Layout from './pages/Layout'
import SignupForm from './components/SignupForm'

function App() {
  return (
    <>

            <UserContext>
      <div className='bg-Cbackground min-h-dvh '>

        <div className='flex'>
          <div>
              <AppSidebar />
          </div>
          <div className='flex-1 w-full  m-1 h-max'>
          
            <Routes>
                <Route path='/login' element={<Form/>}/>
                <Route element={<Form  type="instructors"/>} path='/instlogin'></Route>
                <Route path='/signup' element={<SignupForm />}/>
                <Route element={<SignupForm  type="instructors"/>} path='/instsingup'></Route>
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
