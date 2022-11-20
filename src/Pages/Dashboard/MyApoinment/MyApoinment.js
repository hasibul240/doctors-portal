import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyApoinment = () => {

    const { user } = React.useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user.email}`;
    console.log(url);

    const { data: bookings = [] } = useQuery({
        queryKey: ["booking", user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h3 className='text-3xl'>My Apoinments</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index) => <tr key={booking._id}>
                                <th>{index+1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                            </tr>)
                        }
                        {/* <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApoinment;