import { TextField, Input } from "@mui/material";
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
      <div className="grid grid-cols-1 py-20 text-center md:grid-cols-12 md:grid-rows-6">
        <h1 className="text- col-span-full mb-10 text-center text-2xl font-light">
          Create a new account
        </h1>

        <div className="md:col-span-1 md:col-start-6 md:row-start-2">
          <TextField
            color="primary"
            type="text"
            label="First Name"
            id="fName"
            required
            fullWidth
          />
        </div>

        <div className="md:col-span-3 md:col-start-6 md:row-start-3">
          <TextField
            color="primary"
            type="email"
            label="Email Address"
            required
            id="email"
            fullWidth
          />
        </div>
        <div className="md:col-span-3 md:col-start-6 md:row-start-4">
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
    </form>
  );
}

export default RegisterForm;
