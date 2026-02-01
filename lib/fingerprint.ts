"use client";

import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export function useFingerprint() {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        if (isMounted) setVisitorId(result.visitorId);
      } catch (error) {
        console.error("FingerprintJS error:", error);
        if (isMounted) {
          // fallback ID
          setVisitorId(Math.random().toString(36).substring(2) + Date.now().toString(36));
        }
      }
    };

    initFingerprint();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fully async-friendly getter
  const getFingerprint = async (): Promise<string> => {
    if (visitorId) return visitorId;

    // wait until visitorId is available
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (visitorId) {
          clearInterval(interval);
          resolve(visitorId);
        }
      }, 50);

      // fallback after 3 seconds
      setTimeout(() => {
        clearInterval(interval);
        resolve(Math.random().toString(36).substring(2) + Date.now().toString(36));
      }, 3000);
    });
  };

  return { getFingerprint };
}
