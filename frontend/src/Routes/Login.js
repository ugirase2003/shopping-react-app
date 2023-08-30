import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import * as Yup from "yup";
import img1 from "../components/assets/img/img4.png";
import { useTransition, animated } from "@react-spring/web";
import { UserContext } from "../components/Context/UserContext";
import { Cart_Context } from "../components/Context/CartSizeContext";
import GoToTop from "../components/subComp/GoToTop";

const Login = () => {
  const userCon = useContext(UserContext);
  const cartCon = useContext(Cart_Context);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [wrongCred, setWrongCred] = useState(false);

  const transition = useTransition(wrongCred, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const login_cred_schema = Yup.object({
    email: Yup.string()
      .email("Enter Valid Email")
      .required("Please Enter Your Email"),
    password: Yup.string().required("Password is requried"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: login_cred_schema,
    onSubmit: async () => {
      // login operation
      setLoader(true);
      const resp = await axios
        .post( process.env.REACT_APP_BASE_URL+"/login", formik.values)
        .then((res) => {
          setLoader(false);
          console.log(res.data);

          userCon.setUser(res.data);
          cartCon.setCartSize(res.data.size);

          localStorage.setItem("user", JSON.stringify(res.data));

          console.log("Password Matched");
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setLoader(false);
            setWrongCred(true);
            setInterval(() => {
              setWrongCred(false);
            }, 5000);
            console.log("Wrong Password");
          }
        });
    },
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 relative  max-w-[1200px] mx-auto">
      <div>
        <img
          className="sm:h-[450px] h-[300px] object-contain mx-auto mt-5 sm:mt-16"
          src={img1}
        />
      </div>

      <div className="flex min-h-full flex-col justify-center   px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-left text-2xl font-semibold  leading-9 tracking-tight text-gray-900 font-sans">
            Welcome to Shoppie,
            <br />
            Sign In to Continue
          </h2>
          <p className="text-xs mt-2">
            Don't have an account ?
            <Link
              className="border-b-2 ml-2 font-bold  border-gray-600  "
              to={"/register"}
            >
              Create Account{" "}
            </Link>
            <br />
            It takes less than a minute
          </p>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label
                for="email"
                className="block  text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />

                {formik.errors.email && formik.touched.email ? (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                {formik.errors.password && formik.touched.password ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <div className="text-sm text-center">
                <a
                  href="#"
                  className="border-b-2 text-xs border-purple-500 text-purple-700  hover:text-purple-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md   bg-purple-700 px-3 h-10 text-sm font-semibold  text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 "
              >
                {" "}
                {loader ? (
                  <div
                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
            {transition((style, item) =>
              item ? (
                <animated.div
                  style={style}
                  className="bg-red-200 text-red-700 text-xs p-3 text-center rounded-sm"
                >
                  Incorrect Email or Password or this Account Doesn't Exist !!
                </animated.div>
              ) : (
                ""
              )
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500"></p>
        </div>
      </div>
      <GoToTop/>
    </div>
  );
};

export default Login;
