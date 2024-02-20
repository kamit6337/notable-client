import { useEffect, useState } from "react";

const FindingScreenHeight = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Function to update screen height when the window is resized
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  return screenHeight;
};

export default FindingScreenHeight;
