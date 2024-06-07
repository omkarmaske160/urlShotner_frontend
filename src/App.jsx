import React from 'react'
import {  BrowserRouter , Routes  , Route , Outlet } from 'react-router-dom'
import Home from './pages/share/Home'
import Account from './pages/user/Account'
import UserNavbar from './components/UserNavbar'
import AdminNavbar from './components/AdminNavbar'
import Dashboard from './pages/admin/Dashboard'
import Protected from './pages/share/Protected'
import Visit from './pages/share/Visit'
import AdminProtected from './pages/share/AdminProtected'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/share/Register'
import './index.css'
const App = () => {
  return <>
    <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/visit/:id' element={<Visit />} />
          <Route path='/user' element={<> <Protected compo={<> <UserNavbar /> <Outlet /> </>} /></>}>
          <Route index element={<Account /> } />
          </Route>
          <Route path='/admin' element={<AdminProtected compo={<><AdminNavbar /> <Outlet /></>} />} >
          <Route index element={<Dashboard /> } />
          </Route>
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  </>
}

export default App