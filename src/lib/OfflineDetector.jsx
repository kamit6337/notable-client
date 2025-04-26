import { useState, useEffect } from "react";

const OfflineDetector = () => {
  const [isOnline, setIsOnline] = useState(
    typeof window !== "undefined" && window.navigator.onLine
  );

  const [showNetworkPage, setShowNetworkPage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      setShowNetworkPage(false);
    } else {
      setShowNetworkPage(true);
    }
  }, [isOnline]);

  if (showNetworkPage) {
    return (
      <section
        className="w-full h-full fixed top-0 left-0 flex justify-center items-center backdrop-blur-lg"
        style={{ zIndex: 9999 }}
      >
        <main className="border bg-white text-black p-20 rounded">
          <p>Network problem. Check your internet connection</p>
        </main>
      </section>
    );
  }

  return null;
};

export default OfflineDetector;
