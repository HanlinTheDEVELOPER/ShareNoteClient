import logo from "../assets/logo.svg";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
// import Plus from "./Plus";

const Nav = () => {
  const [auth, logOut] = useAuthStore((state) => [state.auth, state.logOut]);
  const [setUser] = useUserStore((state) => [state.user, state.setUser]);

  return (
    <nav className="bg-slate-50 py-4 px-10 flex justify-between">
      <h1 className=" text-teal-600 font-bold text-4xl font-italic flex items-center gap-2">
        <img src={logo} alt="logo" className="w-10" />
        Share Notes
      </h1>
      {auth ? (
        <>
          <button className="btn" onClick={logOut}>
            logout
          </button>
          <button className="btn" onClick={setUser}>
            Me
          </button>
        </>
      ) : (
        <a href={`${import.meta.env.VITE_API_URL}/api/v1/auth/google`}>gmail</a>
      )}
    </nav>
  );
};

export default Nav;
