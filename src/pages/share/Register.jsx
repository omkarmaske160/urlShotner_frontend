import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useRegisterMutation } from '../../redux/api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ toggle }) => {
    const [register, { isSuccess, isError }] = useRegisterMutation();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cpassword: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            email: yup.string().email("Please enter a valid email").required("Enter Email"),
            password: yup.string().required("Enter Password"),
            cpassword: yup.string().required("Confirm Password").oneOf([yup.ref("password")], "Passwords must match")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await register(values).unwrap();
                resetForm();
            } catch (error) {
                console.error("Failed to register:", error);
            }
        }
    });
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            toast.success("Registered Successfully");
        }
    }, [isSuccess]);

    const getClassses = (fieldName) => classNames({
        "bg-white border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5": true,
        "border-green-500": formik.touched[fieldName] && !formik.errors[fieldName],
        "border-red-500": formik.touched[fieldName] && formik.errors[fieldName]
    });

    return (
        <section className=" bg-no-repeat min-h-screen flex items-center  justify-center w-full md:bg-cover md:bg-center bg-bottom" style={{ backgroundImage: "url('./assets/Shortly.jpg')" }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a> */}
                <div className="w-[100%]  rounded-lg shadow md:mt-20 md:w-[160%] xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-3xl text-center font-extrabold leading-tight tracking-tight text-orange-950 md:text-4xl">
                            SignUp
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-1 text-lg  font-semibold text-gray-900 bg-gradient-to-r from-gray-900 text-bold to-gray-500 bg-clip-text text-transparent">Name</label>
                                <input
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    className={getClassses("name")}
                                    id="name"
                                    placeholder="John Deo"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500 mt-1">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-lg  font-semibold text-gray-900 bg-gradient-to-r from-gray-900 text-bold to-gray-500 bg-clip-text text-transparent">Email</label>
                                <input
                                    {...formik.getFieldProps("email")}
                                    type="text"
                                    className={getClassses("email")}
                                    id="email"
                                    placeholder="johndeo@gmail.com"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 mt-1">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 text-lg  font-semibold text-gray-900 bg-gradient-to-r from-gray-900 text-bold to-gray-500 bg-clip-text text-transparent">Password</label>
                                <input
                                    {...formik.getFieldProps("password")}
                                    type="password"
                                    className={getClassses("password")}
                                    id="password"
                                    placeholder="********"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 mt-1">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="block mb-1 text-lg  font-semibold text-gray-900 bg-gradient-to-r from-gray-900 text-bold to-gray-500 bg-clip-text text-transparent">Confirm Password</label>
                                <input
                                    {...formik.getFieldProps("cpassword")}
                                    type="password"
                                    className={getClassses("cpassword")}
                                    id="cpassword"
                                    placeholder="********"
                                />
                                {formik.touched.cpassword && formik.errors.cpassword ? (
                                    <div className="text-red-500 mt-1">{formik.errors.cpassword}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Sign up
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link to='/' className="font-medium text-blue-600 hover:underline">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
