import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useLoginMutation } from '../../redux/api/authApi';
import classNames from 'classnames';

const Login = () => {
  const [LoginUser] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("Please enter a valid email").required("Enter Email"),
      password: yup.string().required("Enter Password")
    }),
    onSubmit: (values, { resetForm }) => {
      LoginUser(values);
      resetForm();
    }
  });

  const emailClasses = useMemo(() => classNames({
    "bg-white border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5": true,
    "border-green-500": formik.touched.email && !formik.errors.email,
    "border-red-500": formik.touched.email && formik.errors.email,
  }), [formik]);

  const passwordClasses = useMemo(() => classNames({
    "bg-white border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5": true,
    "border-green-500": formik.touched.password && !formik.errors.password,
    "border-red-500": formik.touched.password && formik.errors.password,
  }), [formik]);

  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "user") {
        navigate('/user');
      }
    }
  }, [user, navigate]);

  return (
    <section className=" bg-no-repeat min-h-screen flex items-center  justify-center w-full md:bg-cover md:bg-center bg-bottom" style={{ backgroundImage: "url('/src/assets/Shortly.jpg')" }}>
      <div className="flex flex-col items-center justify-center px-6 py-8  mx-auto lg:py-0 ">
        <div className="w-[100%]  rounded-lg shadow md:mt-20 md:w-[150%] xl:p-0">
          <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
            <h1 className="text-3xl text-center font-extrabold leading-tight tracking-tight text-orange-950 md:text-4xl">
              SignUp
            </h1>
            <form className="space-y-6 md:space-y-8" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-1 text-lg  font-semibold text-gray-900 bg-gradient-to-r from-gray-900 text-bold to-gray-500 bg-clip-text text-transparent">
                  Your email
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  placeholder="name@company.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 mt-1">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 text-lg  font-semibold text-gray-900 bg-gradient-to-r from-gray-900 text-bold to-gray-500 bg-clip-text text-transparent">
                  Password
                </label>
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  placeholder="••••••••"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 mt-1">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <Link to='/register' className="font-medium text-blue-600 hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Login;
