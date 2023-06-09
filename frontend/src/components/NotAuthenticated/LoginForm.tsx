import { TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.service";
import axios from "axios";
import isValidEmail from "../../utils/email.utils";

import { useAuth } from "../Context/Auth/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setCurrentUser } = useAuth();

  function navigateToMyLists() {
    navigate("/lists");
  }

  useEffect(() => {
    isAuthenticated && navigateToMyLists();
  }, [isAuthenticated]);

  // User data states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error" | "unAuthorized" | "authorized"
  >("idle");

  // loading animation states
  const [isFormClosed, setFormClosed] = useState(false);
  const [isFormLoading, setFormLoading] = useState(false);

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setEmail(email);
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPassword(password);
  }

  const AnimatedDiv = animated.div;

  const closeAnimation = useSpring({
    from: { opacity: 1, height: "100%" },
    to: {
      opacity:
        submitStatus === "loading" ||
        submitStatus === "authorized" ||
        submitStatus === "unAuthorized" ||
        submitStatus === "error"
          ? 0
          : 1,
      height:
        submitStatus === "loading" ||
        submitStatus === "authorized" ||
        submitStatus === "unAuthorized" ||
        submitStatus === "error"
          ? "0%"
          : "100%",
    },
    config: { duration: 400 },
    onRest: () => {
      if (
        submitStatus === "loading" ||
        submitStatus === "authorized" ||
        submitStatus === "unAuthorized" ||
        submitStatus === "error"
      ) {
        setFormClosed(true);
      }
    },
  });

  async function loginUser(event: FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      return;
    }

    setSubmitStatus("loading");
    setFormLoading(true);
    // Create user object
    const userData = {
      email: email,
      password: password,
    };

    try {
      // Send user data to backend
      const response = await api.post("/users/login", userData);
      if (response.status == 200) {
        // Update the isAuthenticated state
        setIsAuthenticated(true);
        setSubmitStatus("authorized");
        // console.log(response.data.user);
        setCurrentUser(response.data.user);

        // Redirect to My Lists
        navigateToMyLists();
      } else if (response.status == 401) {
        setSubmitStatus("unAuthorized");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setSubmitStatus("unAuthorized");
      } else {
        console.log(error);
        setSubmitStatus("error");
      }
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <>
      <AnimatedDiv style={closeAnimation}>
        <div>
          <form onSubmit={loginUser}>
            <div className="grid grid-cols-1 py-20 text-center md:grid-cols-12">
              <h1 className="text-2xl font-light md:col-span-full md:ml-6">
                Log in to your account
              </h1>
              <div className="container mt-10 grid grid-cols-4 gap-3 px-10 md:col-span-7 md:col-start-6 md:mt-6 md:grid-cols-12 md:gap-5 md:px-0">
                <div className="col-span-4 md:col-span-4 md:col-start-1 md:row-start-2">
                  <TextField
                    color="primary"
                    type="email"
                    label="Email Address"
                    name="email"
                    onChange={handleEmail}
                    value={email}
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
                <div className="col-span-4 md:col-span-4 md:col-start-1 md:row-start-3">
                  <TextField
                    color="primary"
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handlePassword}
                    value={password}
                    required
                    id="password"
                    fullWidth
                  />
                </div>
                <div className="col-span-2 col-start-2 md:col-span-2 md:col-start-2 md:row-start-4">
                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="rounded-lg bg-gray-700 px-4 py-2 text-lg text-white shadow shadow-black transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-md hover:shadow-black active:bg-black  active:shadow-lg active:shadow-black md:text-2xl"
                  >
                    Sign In
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
      {isFormClosed && submitStatus === "authorized" && (
        <div className="flex h-full items-center justify-center opacity-90">
          <p className="text-2xl text-green-500">Logged in successfully</p>
        </div>
      )}
      {isFormClosed && submitStatus === "unAuthorized" && (
        <div className="flex h-full items-center justify-center opacity-90">
          <p className="text-2xl text-red-500">
            Authentication failed, please check your credentials.
          </p>
        </div>
      )}
      {isFormClosed && submitStatus === "error" && (
        <div className="flex h-full items-center justify-center opacity-90">
          <p className="text-2xl text-red-500">Server error.</p>
        </div>
      )}
    </>
  );
}

export default LoginForm;
