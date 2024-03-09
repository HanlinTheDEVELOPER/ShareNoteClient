/* eslint-disable react/prop-types */
import { useAuthStore } from "../../store/authStore";
import { useModalStore } from "../../store/modalStore";
import ProtectedButton from "./ProtectedButton";
const ProtectedRoute = ({ children }) => {
  const auth = useAuthStore((state) => state.auth);
  const setIsLoginModalOpen = useModalStore(
    (state) => state.setIsLoginModalOpen
  );
  if (!auth)
    return (
      <div className="w-full   h-screen top-0 flex justify-center items-center">
        <ProtectedButton fn={setIsLoginModalOpen}>Log In</ProtectedButton>
      </div>
    );
  return <>{children}</>;
};

export default ProtectedRoute;
