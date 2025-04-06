import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import "./progressStyle.css";
const RProgressBar: React.FC = () => {
  const navigation = useNavigation();
  // console.log("nav state", navigation);
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start(); // Start progress bar
    } else {
      NProgress.done(); // Complete progress bar
    }
  }, [navigation.state]);

  return null; // Visual only
};

export default RProgressBar;
