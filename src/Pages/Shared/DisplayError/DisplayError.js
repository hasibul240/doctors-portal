import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem('aceess_token');
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <p className='text-red-500'>Something went wrong!!</p>
            <p className="text-red-400">{error.statusText || error.message}</p>
            <h1 className='text-4xl'>pleass <button onClick={handleLogOut}>Sign out</button> and Login again</h1>
        </div>
    );
};

export default DisplayError;