import { useEffect, useState } from "react";
import { checkApiHealth } from "../api/predictRoomType";

export type ApiStatus = "checking" | "online" | "offline";

const POLL_INTERVAL_MS = 15000;

export function useApiStatus(): ApiStatus {
  const [status, setStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function poll() {
      const ok = await checkApiHealth(controller.signal);
      if (!cancelled) setStatus(ok ? "online" : "offline");
    }

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return status;
}
