import { TextField } from "@mui/material";
// import { useState } from "react";

function RegisterForm() {
  // const [email, setEmail] = useState("");

  // function handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
  //   const value = event.currentTarget.value;
  //   if (value) {
  //     setEmail(value);
  //   }
  // }

  return (
    <form>
      <div className="grid grid-cols-1 py-20 text-center md:grid-cols-12">
        <h1 className="text-2xl font-light md:col-span-full md:ml-6">
          Create a new account
        </h1>
        <div className="container mt-10 grid grid-cols-4 grid-rows-6 gap-3 px-10 md:col-span-7 md:col-start-6 md:mt-0 md:grid-cols-12 md:gap-5 md:px-0">
          <div className="col-span-2 md:col-span-2 md:row-start-2">
            <TextField
              color="primary"
              type="text"
              label="First Name"
              id="fName"
              required
              fullWidth
            />
          </div>

          <div className="col-span-2 md:col-span-2 md:row-start-2">
            <TextField
              color="primary"
              type="text"
              label="Last Name"
              id="lName"
              required
              fullWidth
            />
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-1 md:row-start-3">
            <TextField
              color="primary"
              type="email"
              label="Email Address"
              required
              id="email"
              fullWidth
            />
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-1 md:row-start-4">
            <TextField
              color="primary"
              type="password"
              label="Password"
              required
              id="password"
              fullWidth
            />
          </div>
          <div className="col-span-2 col-start-2 md:col-span-2 md:col-start-2 md:row-start-5">
            <button className="rounded-lg bg-gray-700 px-4 py-2 text-lg text-white shadow shadow-black transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-md hover:shadow-black active:bg-black  active:shadow-lg active:shadow-black md:text-2xl">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
