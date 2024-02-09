import { useEffect, useRef } from "react";

const OnClickOutside = (callback) => {
  const ref = useRef(null);
  const isOpen = useRef(false); // Track whether options are open

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen.current &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        // Clicked outside the div and options are open, hide the options
        callback();
      }
    };

    const handleToggleOptions = () => {
      isOpen.current = !isOpen.current; // Toggle the flag when options are opened/closed
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleToggleOptions);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleToggleOptions);
    };
  }, [callback]);

  return { ref };
};

export default OnClickOutside;
