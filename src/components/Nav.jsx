import logo from "../assets/logo.svg";
import { useAuthStore } from "../store/authStore";
// import Plus from "./Plus";

const Nav = () => {
  const [auth, logOut] = useAuthStore((state) => [state.auth, state.logOut]);
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
          <button
            className="btn"
            onClick={async () => {
              const me = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/me`,
                {
                  credentials: "include",
                  headers: {
                    Authentication: auth?.token,
                  },
                }
              );
              const res = await me.json();
              console.log(res);
            }}
          >
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
