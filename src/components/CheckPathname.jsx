import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CheckPathname = () => {
  const [pathnameOK, setPathnameOK] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
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

  return { pathnameOK };
};

export default CheckPathname;
