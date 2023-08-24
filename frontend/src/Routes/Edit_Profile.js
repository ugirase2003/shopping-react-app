import React, { useContext, useState } from "react";
import { UserContext } from "../components/Context/UserContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useTransition, animated } from "@react-spring/web";
import Operation_Modal from "../components/subComp/Operation_Modal";
import Edit_Ill from "../components/assets/img/edit_png.jpg";
import { Cart_Context } from "../components/Context/CartSizeContext";

const Edit_Profile = () => {
  const [loader, setLoader] = useState(false);
  const userCont = useContext(UserContext);
  const cart = useContext(Cart_Context);

  const [restatus, setRestatus] = useState(null);
  const transition = useTransition(restatus, {
    from: { y: -100 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -100, opacity: 0 },
    config: {
      tension: 120,
      friction: 20,
    },
  });

  //schema for update
  const updateSchema = Yup.object({
    name: Yup.string().max(25),
    phone: Yup.string().max(10, "Enter Valid Number"),
    password: Yup.string().required("Password is Required"),
    npass: Yup.string().min(6, "Password must has length 5"),
    addressLine: Yup.string().max(30),
    state: Yup.string().max(20),
    pincode: Yup.string().max(6, "Enter valid pincode"),
  });

  const updateData = async (values, { resetForm }) => {
    const pass = values.password;
    delete values.password;
    for (let key in values) {
      if (values[key] === "") delete values[key];
    }

    if (Object.keys(values).length === 0) {
      alert("Fill Something to update");
      resetForm("");
    } else {
      setLoader(true);
      const res = await axios
        .patch(process.env.REACT_APP_BASE_URL+"/update/userinfo/" + userCont.user._id, {
          password: pass,
          ...values,
        })
        .catch((err) => {
          resetForm("");
          setRestatus({ status: err.response.status });
          setInterval(() => setRestatus(null), 5000);
        });
      setLoader(false);
      setRestatus({ status: res.status });
      getUserInfo();
      resetForm("");
      setInterval(() => setRestatus(null), 5000);
    }
  };

  const getUserInfo = async () => {
    //check local storage
    const savedUser = localStorage.getItem("user");
    if (savedUser != null) {
      let user = JSON.parse(savedUser);
      console.log(user);
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/getUserData/" + user._id).catch((err) => {
        console.log("Error at fetching", err);
      });

      if (res.status === 201) {
        userCont.setUser(res.data);
        cart.setCartSize(res.data.size);
      } else if (res.status === 401 || res.status === 403)
        console.log("Token has Expired");
      else if (res.status === 404 || res.status === 500)
        console.log("Internal Errro Occured", res.data);
      else console.log("Problem", res.status);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      npass: "",
      addressLine: "",
      state: "",
      pincode: "",
    },
    validationSchema: updateSchema,
    onSubmit: updateData,
  });
  return (
    <div className=" grid sm:grid-cols-2 relative items-center sm:top-16 mx-auto max-w-[1400px] sm:mb-36  ">
      {/* success modal */}
      {transition((style, status) =>
        status != null ? (
          <animated.div
            style={style}
            className={"fixed w-full inset-0 m-auto md:w-96      z-50 "}
          >
            <Operation_Modal status={status} setStatus={setRestatus} />
          </animated.div>
        ) : null
      )}

      <div className="h-full flex justify-center">
        <img src={Edit_Ill} className="object-contain max-w-[400px] w-full" />
      </div>

      <div className="relative min-h-[350px] py-10 px-6 shadow-md   rounded-lg bg-white  ">
        <p className="font-bold text-lg">Edit Profile</p>
        <p className="text-xs text-red-400 font-bold">
          Only fill the details which you want to update
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-2 gap-2  ">
            <div>
              <label
                for="name"
                className="block text-xs  leading-6 text-gray-900 font-sans"
              >
                New Username
              </label>
              <div className="mt-0.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 ring-1  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2 foc"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
            </div>
            <div>
              <label
                for="email"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                New Email
              </label>
              <div className="mt-0.5">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
            </div>
            <div>
              <label
                for="phone"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                Phone
              </label>
              <div className="mt-0.5">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </div>
            </div>
            <div>
              <label
                for="password"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                Current Password
              </label>
              <div className="mt-0.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
            </div>
            <div>
              <label
                for="npass"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                New Password
              </label>
              <div className="mt-0.5">
                <input
                  id="npass"
                  name="npass"
                  type="password"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.npass}
                />

                {formik.errors.npass && formik.touched.npass ? (
                  <p className="text-xs text-red-500">{formik.errors.npass}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label
                for="state"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                State
              </label>
              <div className="mt-0.5">
                <input
                  id="state"
                  name="state"
                  type="text"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                />
              </div>
            </div>
            <div className="row-span-2">
              <label
                for="addressLine"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                Address Line
              </label>
              <div className="mt-0.5">
                <textarea
                  id="addressLine"
                  name="addressLine"
                  type="text"
                  rows={4}
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2  "
                  onChange={formik.handleChange}
                  value={formik.values.addressLine}
                />

                {formik.errors.addressLine && formik.touched.addressLine ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.addressLine}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label
                for="pincode"
                className="block text-xs   leading-6 text-gray-900 font-sans"
              >
                Pincode
              </label>
              <div className="mt-0.5">
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.pincode}
                />

                {formik.errors.pincode && formik.touched.pincode ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.pincode}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4 relative   flex justify-end ">
              <button
                className="p-2 px-3 font-bold rounded-md text-sm border   bg-white hover:border-black mr-3"
                onClick={() => formik.resetForm("")}
                type="reset"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md font-bold text-sm border ml-2  text-white bg-purple-500 hover:bg-purple-700"
              >
                {loader ? (
                  <div className="flex w-full justify-center items-center">
                    <div
                      class="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white-600 rounded-full "
                      role="status"
                      aria-label="loading"
                    ></div>
                    <span class="text-xs ml-2">Saving..</span>
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit_Profile;
