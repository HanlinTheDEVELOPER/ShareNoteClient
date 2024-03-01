/* eslint-disable react/prop-types */
import { useAuthStore } from "../../store/authStore";
import ProtectedButton from "./ProtectedButton";
const ProtectedRoute = ({ children }) => {
  const auth = useAuthStore((state) => state.auth);
  if (!auth)
    return (
      <div className="w-full  bg-blue-400  h-screen top-0 flex justify-center items-center">
        <ProtectedButton>Log In</ProtectedButton>
      </div>
    );
  return <>{children}</>;
};

export default ProtectedRoute;
