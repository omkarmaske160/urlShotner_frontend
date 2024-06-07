import React, { useEffect, useState } from 'react';
import { useGetAdminUsersQuery, useLazyGetAdminUserUrlsQuery, useUpdateAdminUserMutation } from '../../redux/api/adminApi';
import { toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const { data } = useGetAdminUsersQuery();
    const [userUrl, { data: urlData }] = useLazyGetAdminUserUrlsQuery();
    const [updateUser, { isSuccess, error, isError }] = useUpdateAdminUserMutation();
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        if (isSuccess) {
            toast.success('User Updated Successfully');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(error);
        }
    }, [isError]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <ul className="list-group">
                        {data && data.map(item => (
                            <li
                                key={item._id}
                                onClick={() => userUrl(item._id)}
                                className="list-group-item cursor-pointer flex justify-between items-center py-2 px-4 border-b"
                            >
                                {item.name}
                                <button onClick={() => setSelectedUser(item)}>
                                    <i className="bi bi-pencil text-blue-500"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul className="list-group">
                        {urlData && urlData.map(item => (
                            <li key={item._id} className="list-group-item flex justify-between items-center py-2 px-4 border-b">
                                <span>{item.longUrl}</span>
                                <span className="badge bg-primary text-white">{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {selectedUser && (
                        <div className="card bg-white shadow-md rounded-lg p-4">
                            <div className="card-header font-bold text-lg mb-4">{selectedUser.name}</div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">First Name</label>
                                    <input
                                        onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                        type="text"
                                        value={selectedUser.name}
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="name"
                                        placeholder="Enter Your Name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                        type="text"
                                        value={selectedUser.email}
                                        className="form-control w-full p-2 border border-gray-300 rounded"
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        onChange={e => setSelectedUser({ ...selectedUser, active: e.target.checked })}
                                        checked={selectedUser.active}
                                        className="form-check-input"
                                        type="checkbox"
                                        id="active"
                                    />
                                    <label className="form-check-label" htmlFor="active">Account Active</label>
                                </div>
                                <button
                                    onClick={() => {
                                        updateUser(selectedUser);
                                        setSelectedUser(null);
                                    }}
                                    type="button"
                                    className="btn btn-primary w-full"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Stat = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut data={data} />;
};

export default Dashboard;
