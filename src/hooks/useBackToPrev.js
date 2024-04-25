import { useLocation } from "react-router-dom";

export const useBackToPrev = () => {
  const location = useLocation();
  const fromUrlState = location.pathname + location.search;
  const fromUrl = location?.state?.fromUrl ?? null;
  return { fromUrl, fromUrlState };
};
