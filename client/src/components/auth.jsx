import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button 
      onClick={() => loginWithRedirect()} 
      className="bg-[#e03278] text-white font-bold px-6 h-8 rounded-xl cursor-pointer hover:bg-[#c02060] transition-all duration-300"
    >
      Log In
    </button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="button logout cursor-pointer"
    >
      Log Out
    </button>
  );
};

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="relative px-8 h-12 rounded-xl font-bold text-white
      bg-[#e03278] hover:from-[#9f2a65] hover:to-[#ff4f9a] transition-all duration-300 ease-out hover:drop-shadow-[0_0_6px_#fff] hover:drop-shadow-[0_0_12px_#e03278] hover:drop-shadow-[0_0_24px_#e03278] hover:scale-105  active:scale-95 cursor-pointer"
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      Get Started
    </button>
  );
};

export {LoginButton, LogoutButton, SignupButton};