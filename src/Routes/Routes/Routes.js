import { createBrowserRouter } from "react-router-dom";
import DashbordLayout from "../../Layout/DashbordLayout/DashbordLayout";
import Main from "../../Layout/Main";
import AddDoctor from "../../Pages/AddDoctor/AddDoctor";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Allusers from "../../Pages/Dashboard/AllUsers/Allusers";
import ManageDoctoes from "../../Pages/Dashboard/Managedoctor/ManageDoctoes";
import MyApoinment from "../../Pages/Dashboard/MyApoinment/MyApoinment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../PrivateRoute/PrivateRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement: <DisplayError/>,
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
        errorElement: <DisplayError/>,
        children: [
            {
                path: '/dashboard',
                element: <MyApoinment/>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><Allusers/></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor/></AdminRoute>
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctoes/></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`, {
                    headers: {authorization: `Bearer ${localStorage.getItem('access_token')}`}
                }),
                element: <AdminRoute><Payment/></AdminRoute>
            }
        ]
    }
])

export default router;