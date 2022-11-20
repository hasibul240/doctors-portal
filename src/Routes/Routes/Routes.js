import { createBrowserRouter } from "react-router-dom";
import DashbordLayout from "../../Layout/DashbordLayout/DashbordLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import MyApoinment from "../../Pages/Dashboard/MyApoinment/MyApoinment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashbordLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyApoinment/>
            }
        ]
    }
])

export default router;