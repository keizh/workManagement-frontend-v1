// TEMPLATE approved

import { Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthCheck from "../utils/useAuthCheck";

export function Signin() {
  const navigate = useNavigate();
  const initialError = "";
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(initialError);
  const [loader, setLoader] = useState(false);
  useAuthCheck();
  const postUser = async () => {
    setLoader(true);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/user/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const dataRes = await res.json();
    if (!res.ok) {
      console.log(`Failed to signIn`);
      setLoader(false);
      setError(dataRes.message);
    } else {
      console.log(`Successfully signup`);
      localStorage.setItem("token", dataRes.token);
      setTimeout(() => {
        navigate("/");
        setLoader(false);
      }, 2000);
    }
  };
  const authenticateViaOAuth = async () => {
    window.location.href = `${
      import.meta.env.VITE_SERVER_BASE_URL
    }/user/auth/google`;
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    postUser();
  };

  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center">
        <div>
          <Typography variant="h4" color="blue-gray" align="center">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal" align="center">
            Welcome to WorkManagement
          </Typography>
          <form
            onSubmit={onSubmitHandler}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                value={user.email}
                name="email"
                onChange={(e) =>
                  setUser((user) => ({
                    ...user,
                    [e.target.name]: e.target.value,
                  }))
                }
                required
                size="lg"
                placeholder="SaniyMirza@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                value={user.password}
                name="password"
                onChange={(e) =>
                  setUser((user) => ({
                    ...user,
                    [e.target.name]: e.target.value,
                  }))
                }
                required
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button
              loading={loader}
              className=" flex justify-center gap-2 mt-6"
              fullWidth
              type="submit"
            >
              sign In
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <NavLink to="/signup" className="font-medium text-gray-900">
                Sign up
              </NavLink>
            </Typography>
            {error.length > 0 && (
              <div className=" flex flex-col gap-1">
                <Typography align="center" variant="small" color="red">
                  {error}
                </Typography>
              </div>
            )}
          </form>

          <div className="flex flex items-center justify-center my-5">
            <div
              style={{ border: "0.5px solid black", height: "1px" }}
              className="grow"
            ></div>
            <p className="">OR</p>
            <div
              style={{ border: "0.5px solid black", height: "1px" }}
              className="grow"
            ></div>
          </div>
          <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex justify-center items-center gap-3"
            fullWidth
            onClick={authenticateViaOAuth}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
