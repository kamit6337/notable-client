import { useEffect, useState } from "react";

const FindingWindowWidth = (givenWidth = 768) => {
  const [isWidth, setIsWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < givenWidth) {
        setIsWidth(true);
      } else {
        setIsWidth(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isWidth };
};

export default FindingWindowWidth;
