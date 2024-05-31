import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login/Login"
import { Register } from "../pages/Register/Register"
import { UserProvider } from "../Providers/UserContext"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { Home } from "../pages/Home/Home"

export const RoutesMain = () => {
    return (
      <UserProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoutes />}>
                <Route index element={ <Home />} />
              </Route>
        </Routes>
      </UserProvider>
    )
}