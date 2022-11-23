import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../Shared/ConfirmationModal/ConfirmModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctoes = () => {

    const [deleting_doctor, setDeleting_doctor] = React.useState(null);

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    })

    const handle_delete_doctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`${doctor.name} is deleted successfully`)
                    refetch();
                }
            })
    }

    const closeModal = () => {
        setDeleting_doctor(null);
    }

    if (isLoading) {
        return <div className='mt-52'><Loading /></div>
    }

    return (
        <div>
            <h2 className='text-3xl mb-3'>Manage Doctors {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <tr key={doctor._id}>
                                <th>{index + 1}</th>
                                <td>
                                    {/* <img src={doctor.image} alt="" /> */}
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src={doctor.image} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td>
                                    <label onClick={() => setDeleting_doctor(doctor)} htmlFor="confirm-modal" className="btn btn-sm btn-error">delete</label>
                                    {/* <button htmlFor="confirm-modal" className='btn btn-sm btn-error'>delete</button> */}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleting_doctor && <ConfirmModal
                    title={`Are you sure want to delete ${deleting_doctor.name}`}
                    message={`If you delete ${deleting_doctor.name}. It cant be undone`}
                    modalData={deleting_doctor}
                    buttonName='Delete'
                    closeModal={closeModal}
                    sucesssAction={handle_delete_doctor}
                />
            }
        </div>
    );
};

export default ManageDoctoes;