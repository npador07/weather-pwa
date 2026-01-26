import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setOffline(!navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="bg-yellow-200 text-yellow-900 p-2 rounded-lg text-sm text-center">
      You are offline — showing last saved data
    </div>
  );
}
