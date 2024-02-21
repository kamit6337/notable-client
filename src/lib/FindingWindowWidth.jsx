import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { toggleIsWindowBelowTablet } from "../redux/slice/toggleSlice";

const FindingWindowWidth = (givenWidth = 980) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < givenWidth) {
        dispatch(toggleIsWindowBelowTablet({bool : true}));
      } else {
        dispatch(toggleIsWindowBelowTablet({bool : false}));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return;
};

export default FindingWindowWidth;
