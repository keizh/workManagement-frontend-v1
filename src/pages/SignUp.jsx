// TEMPLATE approved

import { Input, Button, Typography, Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthCheck from "../utils/useAuthCheck";

function IconSolid() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(7, { message: "Must be 8 or more characters long" })
    .max(25, { message: "Must be 25 or fewer characters long" })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must include at least one lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must include at least one Uppercase letter",
    })
    .refine((val) => /[1-9]/.test(val), {
      message: "Must include at least one number",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Must include at least one special character",
    }),
});

export function SignUp() {
  useAuthCheck();
  const navigate = useNavigate();
  const initialError = { name: [], email: [], password: [] };
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(initialError);
  const [loader, setLoader] = useState(false);

  const postUser = async () => {
    setLoader(true);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/user/auth/signup`,
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
      console.log(`Failed to signUp`, dataRes, res);
      setLoader(false);
    } else {
      console.log(`Successfully signup`);
      setTimeout(() => {
        navigate("/signin");
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
    setError(initialError);
    const result = UserSchema.safeParse(user);
    if (result.success) {
      postUser();
    } else {
      result.error.issues.forEach((err) => {
        setError((error) => ({
          ...error,
          [err.path[0]]: [err.message, ...error[err.path[0]]],
        }));
      });
    }
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div>
        <Typography variant="h4" color="blue-gray" align="center">
          Sign Up
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
              Your Name
            </Typography>
            <Input
              value={user.name}
              name="name"
              onChange={(e) =>
                setUser((user) => ({
                  ...user,
                  [e.target.name]: e.target.value,
                }))
              }
              required
              size="lg"
              placeholder="Saniya"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />{" "}
            {error.name.length > 0 && (
              <div className="-mt-5">
                {error.name.map((txt, index) => (
                  <Typography
                    key={index}
                    variant="small"
                    color="red"
                    className="-mt-5"
                  >
                    {txt}
                  </Typography>
                ))}
              </div>
            )}
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
            {error.email.length > 0 && (
              <div className=" flex flex-col gap-1 -mt-5 ">
                {error.email.map((txt, index) => (
                  <Typography
                    align="center"
                    key={index}
                    variant="small"
                    color="red"
                    className=""
                  >
                    {txt}
                  </Typography>
                ))}
              </div>
            )}
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
            {error.password.length > 0 && (
              <div className=" flex flex-col gap-1 -mt-5 ">
                {error.password.map((txt, index) => (
                  <Typography
                    key={index}
                    align="center"
                    variant="small"
                    color="red"
                  >
                    {txt}
                  </Typography>
                ))}
              </div>
            )}
          </div>
          <Alert className="mt-5" variant="outlined" icon={<IconSolid />}>
            <Typography className="font-medium">
              Ensure that these requirements are met:
            </Typography>
            <ul className="mt-2 ml-2 list-inside list-disc">
              <li>At least 8 Character </li>
              <li>At Max 25 Character </li>
              <li>At least one lowercase character</li>
              <li>At least one uppercase character</li>
              <li>At least one digit character</li>
              <li>
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
            </ul>
          </Alert>

          <Button
            loading={loader}
            className=" flex justify-center gap-2 mt-6"
            fullWidth
            type="submit"
          >
            sign up
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <NavLink to="/signin" className="font-medium text-gray-900">
              Sign In
            </NavLink>
          </Typography>
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
          onClick={() => authenticateViaOAuth("google")}
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
  );
}
export default SignUp;
