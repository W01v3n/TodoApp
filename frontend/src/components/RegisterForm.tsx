import { TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import api from "../services/api";

function RegisterForm() {
  // User data states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  // loading animation states
  const [loading, setLoading] = useState(false);

  function handleFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    const firstName = event.target.value;
    setFirstName(firstName);
  }

  function handleLastName(event: React.ChangeEvent<HTMLInputElement>) {
    const lastName = event.target.value;
    setLastName(lastName);
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setEmail(email);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPassword(password);
  }

  function handleVerifyPassword(event: React.ChangeEvent<HTMLInputElement>) {
    const verifyPassword = event.target.value;
    setVerifyPassword(verifyPassword);
  }

  async function registerUser(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    // Create user object
    const userData = {
      username: firstName.concat(lastName),
      email: email,
      password: password,
    };

    try {
      // Send user data to backend
      const response = await api.post("/users/register", userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={registerUser}>
      <div className="grid grid-cols-1 py-20 text-center md:grid-cols-12">
        <h1 className="pb-4 text-2xl font-light md:col-span-full md:ml-6">
          Create a new account
        </h1>
        <div className="container mt-10 grid grid-cols-4 gap-3 px-10 md:col-span-7 md:col-start-6 md:mt-0 md:grid-cols-12 md:gap-5 md:px-0">
          <div className="col-span-2 md:col-span-2 md:row-start-2">
            <TextField
              color="primary"
              type="text"
              label="First Name"
              value={firstName}
              onChange={handleFirstName}
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
              value={lastName}
              onChange={handleLastName}
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
              value={email}
              onChange={handleEmail}
              required
              id="email"
              fullWidth
            />
          </div>
          <div
            className={`col-span-4 row-start-4 md:col-span-4 md:col-start-1`}
          >
            <TextField
              color="primary"
              type="password"
              label="Password"
              value={password}
              onChange={handlePassword}
              required
              id="password"
              fullWidth
              error={
                password !== verifyPassword &&
                password.length > 0 &&
                verifyPassword.length > 0
              }
              helperText={
                password !== verifyPassword &&
                password.length > 0 &&
                verifyPassword.length > 0
                  ? "Passwords do not match"
                  : ""
              }
            />
          </div>
          <div
            className={`col-span-4 row-start-5 md:col-span-4 md:col-start-1`}
          >
            <TextField
              color="primary"
              type="password"
              label="Verify Password"
              value={verifyPassword}
              onChange={handleVerifyPassword}
              required
              id="verify-password"
              fullWidth
              error={
                password !== verifyPassword &&
                password.length > 0 &&
                verifyPassword.length > 0
              }
              helperText={
                password !== verifyPassword &&
                password.length > 0 &&
                verifyPassword.length > 0
                  ? "Passwords do not match"
                  : ""
              }
            />
          </div>

          <div className="col-span-2 col-start-2 row-start-6 md:col-span-2 md:col-start-2 md:row-start-6">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-700 px-4 py-2 text-lg text-white shadow shadow-black transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-md hover:shadow-black active:bg-black  active:shadow-lg active:shadow-black md:text-2xl"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
