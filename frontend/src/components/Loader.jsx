import { LoaderIcon } from "lucide-react";
import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const Loader = () => {
  const {theme} = useThemeStore();
  return <div data-theme = {theme} className="min-h-screen justify-center  flex items-center">
 <LoaderIcon className="animate-spin size-10 text-primary"  /> 
  </div>;
};

export default Loader;
