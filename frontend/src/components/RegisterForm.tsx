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
        <div className="container col-span-7 col-start-6 grid grid-cols-1 gap-5 md:grid-cols-12 md:grid-rows-6">
          <div className="md:col-span-2 md:row-start-2">
            <TextField
              color="primary"
              type="text"
              label="First Name"
              id="fName"
              required
              fullWidth
            />
          </div>

          <div className="md:col-span-2 md:row-start-2">
            <TextField
              color="primary"
              type="text"
              label="Last Name"
              id="lName"
              required
              fullWidth
            />
          </div>

          <div className="md:col-span-4 md:col-start-1 md:row-start-3">
            <TextField
              color="primary"
              type="email"
              label="Email Address"
              required
              id="email"
              fullWidth
            />
          </div>
          <div className="md:col-span-4 md:col-start-1 md:row-start-4">
            <TextField
              color="primary"
              type="password"
              label="Password"
              required
              id="password"
              fullWidth
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
