import { Link, useLocation } from "react-router-dom";
import { IoHardwareChip } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { MobileMenu } from "./MobileMenu";
import { globalLinks } from "./nav.config";
import { MyLogo } from "../content/MyLogo";
import { AccountProfile } from "./AccountProfile";
import { IUser, logout } from "../../stores/auth.slice";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { userAuth } from "../../firebase/appConfig";
import { MySmallLoading } from "../content/MySmallLoading";

interface NavBarPros {
  loading: boolean;
  success: boolean;
  userInfo: IUser | null;
}
const NavBar = ({ loading, success, userInfo }: NavBarPros) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Logout user
  const handleLogout = () => {
    dispatch(logout());
    signOut(userAuth);
  };

  const isActivePath = (path: string, currentPath: string) => {
    return path === currentPath;
  };

  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between gap-2 bg-bgLight px-4 py-10 shadow-sm md:px-6 md:py-2 lg:px-10">
      <MobileMenu />
      <MyLogo />

      <div className="hidden items-center gap-2 md:flex">
        <Link to="/" className="md:hidden">
          <div className="flex items-center gap-2">
            <IoHardwareChip className="text-myPrimary" size={40} />
            <h2 className="text-xl font-bold">Frencho</h2>
          </div>
        </Link>
        <ul className="flex items-center gap-4">
          {globalLinks.map((item) => (
            <li
              className={`myNavLink ${isActivePath(item.to, pathname) && "active"}`}
              key={item.to}
            >
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex items-center gap-2">
        {/* Small loading spinner */}
        {loading ? (
          <li>
            <MySmallLoading />
          </li>
        ) : null}
        {/* If request is ended and user is not logged in */}
        {!loading && !success ? (
          <>
            <li className="hidden md:block">
              <Link to="/signUp" className="myOutlineBtn">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/signIn" className="myPrimaryBtn">
                <PiSignInBold />
                Sign In
              </Link>
            </li>
          </>
        ) : (
          <li>
            <AccountProfile
              avatar={userInfo?.photoURL || ""}
              name={userInfo?.displayName || ""}
              email={userInfo?.email || ""}
              logOut={handleLogout}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
