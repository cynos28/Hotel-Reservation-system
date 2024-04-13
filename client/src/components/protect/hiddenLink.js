import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <>{children}</> : null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? null : <>{children}</>;
};

export const AdminAuthorLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const isAdminOrAuthor = user && (user.role === "admin" || user.role === "author");

  return isLoggedIn && isAdminOrAuthor ? <>{children}</> : null;
};
