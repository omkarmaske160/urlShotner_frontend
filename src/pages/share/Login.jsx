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
    <section className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center w-full" style={{ backgroundImage: "url('/src/assets/Shortly.jpg')", }}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className={emailClasses}
                  id="email"
                  placeholder="name@company.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 mt-1">{formik.errors.email}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  className={passwordClasses}
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
