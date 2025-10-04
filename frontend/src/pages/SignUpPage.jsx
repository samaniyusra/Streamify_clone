import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();
  // const { mutate, isPending, error } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { isPending, error, mutate } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(signupData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25  flex flex-col lg:flex-row w-full  max-w-5xl  mx-auto  bg-base-100  rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4  sm:p-8 flex flex-col">
          <div className="mb-4  flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono  bg-clip-text text-transparent  bg-gradient-to-r from-primary to-secondary">
              {" "}
              Streamify
            </span>
          </div>

          {error && (
            <div className="alert alert-error  mb-4">
              <span> {error.response.data.message} </span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold"> Create An Account</h2>
                  <p className="text-sm opacity-70">
                    {" "}
                    join streamify and start your language learning language
                    adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="john doe"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="john@gmail.com"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text"> Password</span>
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      placeholder="****"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      {" "}
                      Password must be atleast 6 characters
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="cursor-pointer label  justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs "
                        required
                      />
                      <span className="text-sm leading-light">
                        I agree to the
                        <span className="text-primary hover:underline">
                          {" "}
                          terms of service{" "}
                        </span>{" "}
                        and
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary  w-full " type="submit">
                  {" "}
                  {isPending ? (
                    <span className="loading loading-spinner loading-sm">
                      {" "}
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    {" "}
                    Already have an Account
                    <Link to="/login" className="text-primary ,hover-underline">
                      &nbsp; Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

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

export default SignUpPage;
