import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { completeOnBoarding } from "../lib/api";
import { useNavigate } from "react-router-dom";
import {
  CameraIcon,
  LoaderIcon,
  MapIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants";
const OnBoarding = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onBoardingMutate, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutate(formData);
   
  };

const handleRandomAvatar = async () => {
  const idx = Math.floor(Math.random() * 100) + 1;
  const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`
  setFormData({...formData, profilePic:randomAvatar});
  toast.success("random profile picture generated");

};
  return (
    <div className="min-h-screen  bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            {" "}
            Complete your profile{" "}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* //profilepic container  */}
            <div className=" flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* generate random avatar button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random avatar
                </button>
              </div>
            </div>

            {/* full name */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text"> Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="input input-bordered w-full rounded-2xl h-13"
                placeholder="your full name "
              />
            </div>

            {/* bio */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell others about yourself and your language learning goals"
                className="textarea textarea-bordered h-24 w-full rounded-2xl"
              />
            </div>

            {/* languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* native language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text "> Native Language </span>
                </label>

                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={(e) =>
                    setFormData({ ...formData, nativeLanguage: e.target.value })
                  }
                  className="select select-bordered w-full"
                >
                  <option value=""> Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* learning language */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text "> Native Language </span>
                </label>

                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={(e) =>
                    setFormData({ ...formData, learningLanguage: e.target.value })
                  }
                  className="select select-bordered w-full"
                >
                  <option value=""> Select your learning language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* location */}
            <div className="form-control">
              <label className="label" htmlFor="location">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10 pointer-events-none" />
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="city, country"
                />
              </div>
            </div>

            {/* submit form */}

            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
