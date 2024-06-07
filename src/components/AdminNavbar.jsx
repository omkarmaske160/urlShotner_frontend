import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/authApi';
import { toast } from 'react-toastify';

const AdminNavbar = () => {
    const [logout, { isSuccess, isError }] = useLogoutMutation();

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Logout Successfully");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error("Logout Failed");
        }
    }, [isError]);

    return (
        <nav className="bg-light">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/admin" className="font-bold text-lg">Admin</Link>
                    <button className="lg:hidden block text-gray-500 hover:text-gray-700 focus:outline-none" type="button">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    <div className="hidden lg:flex lg:items-center lg:w-auto" id="navbarNavAltMarkup">
                        <div className="lg:flex-grow">
                            <ul className="list-none lg:flex lg:justify-end">
                                <li className="nav-item">
                                    <Link to="/admin" className="nav-link active px-8">Welcome Admin</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
