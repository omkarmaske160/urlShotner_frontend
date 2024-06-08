import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/api/authApi';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector(state => state.user);
    const [logout] = useLogoutMutation();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-light mb-5">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/user" className="font-bold text-lg">URL-SHOTNER</Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/user" className="text-gray-700 hover:text-gray-900">Home</Link>
                        <div className="relative">
                            <button className="bg-primary-600 text-black px-4 py-2 rounded-md shadow-md hover:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-300" onClick={toggleDropdown}>
                                {user.name}
                            </button>
                            {isOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                    <li>
                                        {/* <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link> */}
                                    </li>
                                    <li>
                                        <button onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none">
                                            <i className="bi bi-box-arrow-right mr-2"></i> Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
