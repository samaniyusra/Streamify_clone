import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutate,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });
  const { isPending, error, loginMutation } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation(loginData);
  };
  return (
    <div
      className="h-screen items-center flex justify-center p-4 sm:p-6 md:p-8 "
      data-theme="forest"
    >
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto border border-primary/25 bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* login form section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono  bg-clip-text text-transparent  bg-gradient-to-r from-primary to-secondary">
              {" "}
              Streamify
            </span>{" "}
          </div>
          {/* error message */}
          {error && (
            <div className="alert alert-error  mb-4">
              <span> {error.response.message} </span>
            </div>
          )}
          {/* form section  */}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="mb-5">
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    {" "}
                    sign in to your account to continue your language journey
                  </p>
                </div>
              </div>

              {/* email */}
              <div className="flex flex-col gap-3 space-y-3 mb-5">
                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text"> Email</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="john@gmail.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* password */}
              <div className="flex flex-col gap-3 space-y-3">
                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text"> Password</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full mb-5"
                    placeholder="*****"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              {/* submit buttton */}
              <button
                className="btn btn-primary  w-full "
                type="submit"
                disabled={isPending}
              >
                {" "}
                {isPending ? (
                  <span className="loading loading-spinner loading-sm">
                    signing in....{" "}
                  </span>
                ) : (
                  "Sign in "
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  {" "}
                  Dont have an account
                  <Link to="/signup" className="text-primary ,hover-underline">
                    &nbsp;signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* //image section */}
        <div className="items-center justify-center hidden lg:flex w-1/2 bg-primary/10 ">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm   mx-auto">
              <img src="/Video call-bro.png" alt="" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                {" "}
                connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                {" "}
                Practice conversation, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
