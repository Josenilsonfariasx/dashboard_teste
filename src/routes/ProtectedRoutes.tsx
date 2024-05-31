import { Navigate, Outlet } from "react-router-dom"
import Cookies from 'js-cookie'
export const ProtectedRoutes = () =>{
  const user = Cookies.get('token')
  return user ? <Outlet /> : <Navigate to="/" />
}