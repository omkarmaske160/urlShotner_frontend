import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const AdminProtected = ({compo}) => {
    const { user } = useSelector(state => state.user)
      
    return  (user && user.role === "admin") ? compo : <Navigate to='/' /> 
}
  

export default AdminProtected
