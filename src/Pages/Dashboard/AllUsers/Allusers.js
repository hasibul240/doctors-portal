import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Allusers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    })


    const handle_make_admin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    
                    toast.success('User is now admin');
                    refetch();
                }
            });
    }

    const handle_delete = (id) => {
        console.log(id)
    }

    return (
        <div>
            <h2 className="text-3xl mb-3">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user?.role !== 'admin' && <button onClick={() => handle_make_admin(user._id)} className='btn btn-primary btn-xs'>Make Admin</button>
                                    }
                                </td>
                                <td><button onClick={() => handle_delete(user._id)} className='btn btn-xl'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;