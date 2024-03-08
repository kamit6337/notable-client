import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleIsWindowBelowTablet } from "../redux/slice/toggleSlice";

const FindingWindowWidth = (givenWidth = 800) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowWidth = () => {
      if (window.innerWidth < givenWidth) {
        console.log("below given width", window.innerWidth);

        dispatch(toggleIsWindowBelowTablet({ bool: true }));
      } else {
        dispatch(toggleIsWindowBelowTablet({ bool: false }));
      }
    };

    window.addEventListener("resize", handleWindowWidth);

    return () => {
      window.removeEventListener("resize", handleWindowWidth);
    };
  }, [dispatch, givenWidth]);

  return;
};

export default FindingWindowWidth;
