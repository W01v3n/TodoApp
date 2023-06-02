import { TextField } from "@mui/material";
import { FormEvent, useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { ClipLoader } from "react-spinners";
import api from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import isValidEmail from "../../utils/email.utils";

function RegisterForm() {
  // User data states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if user is already logged in
  function navigateToMyLists() {
    navigate("/lists");
  }

  function navigateToLogin() {
    navigate("/login");
  }

  useEffect(() => {
    isAuthenticated && navigateToMyLists();
  });

  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // loading animation states
  const [isFormClosed, setFormClosed] = useState(false);
  const [isFormLoading, setFormLoading] = useState(false);

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

  const AnimatedDiv = animated.div;

  const closeAnimation = useSpring({
    from: { opacity: 1, height: "100%" },
    to: {
      opacity:
        submitStatus === "loading" ||
        submitStatus === "success" ||
        submitStatus === "error"
          ? 0
          : 1,
      height:
        submitStatus === "loading" ||
        submitStatus === "success" ||
        submitStatus === "error"
          ? "0%"
          : "100%",
    },
    config: { duration: 400 },
    onRest: () => {
      if (
        submitStatus === "loading" ||
        submitStatus === "success" ||
        submitStatus === "error"
      ) {
        setFormClosed(true);
      }
    },
  });

  async function registerUser(event: FormEvent) {
    event.preventDefault();
    if (password !== verifyPassword) {
      return;
    } else if (!isValidEmail(email)) {
      return;
    }
    setSubmitStatus("loading");
    setFormLoading(true);
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
      if (response.status == 201) {
        setSubmitStatus("success");
        navigateToLogin();
      }
    } catch (error) {
      console.log(error);
      setSubmitStatus("error");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <>
      <AnimatedDiv style={closeAnimation}>
        <div>
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
                    name="fName"
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
                    name="lName"
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
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    helperText={
                      !isValidEmail(email) &&
                      email.length > 0 &&
                      "Email is not valid!"
                    }
                    error={!isValidEmail(email) && email.length > 0}
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
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    required
                    id="password"
                    fullWidth
                    error={
                      (password !== verifyPassword &&
                        password.length > 0 &&
                        verifyPassword.length > 0) ||
                      (password.length > 0 && password.length < 6)
                    }
                    helperText={
                      password !== verifyPassword &&
                      password.length > 0 &&
                      verifyPassword.length > 0
                        ? "Passwords do not match"
                        : password.length > 0 &&
                          password.length < 6 &&
                          "Password has to be at least 6 characters."
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
                    disabled={submitStatus === "loading"}
                    className="rounded-lg bg-gray-700 px-4 py-2 text-lg text-white shadow shadow-black transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-md hover:shadow-black active:bg-black  active:shadow-lg active:shadow-black md:text-2xl"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </AnimatedDiv>
      {isFormLoading && (
        <div className="relative inset-0 flex items-center justify-center md:absolute md:top-96 md:ml-10">
          <ClipLoader color="#5b5b5b" loading={true} size={40} />
        </div>
      )}

      {isFormClosed && submitStatus === "success" && (
        <div className="flex h-full items-center justify-center opacity-90">
          <p className="text-2xl text-green-500">Registration Successful!</p>
        </div>
      )}
      {isFormClosed && submitStatus === "error" && (
        <div className="flex h-full items-center justify-center opacity-90">
          <p className="text-2xl text-red-500">Registration Failed.</p>
        </div>
      )}
    </>
  );
}

export default RegisterForm;
