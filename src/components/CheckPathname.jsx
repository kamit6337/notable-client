import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CheckPathname = () => {
  const [pathnameOK, setPathnameOK] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Current Pathname:", pathname); // Debugging log
    if (
      pathname === "/notes" ||
      pathname.startsWith("/notebooks/") ||
      pathname.startsWith("/tags/")
    ) {
      setPathnameOK(true);
    } else {
      setPathnameOK(false);
    }
  }, [pathname]);

  console.log("Pathname OK:", pathnameOK); // Debugging log

  return { pathnameOK };
};

export default CheckPathname;
