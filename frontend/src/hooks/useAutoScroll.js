import { useEffect } from "react";

export function useAutoScroll(dep, ref) {
  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [dep, ref]);
}
