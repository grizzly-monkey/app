import Main from "./Main";
import "./style.scss";
import "./responsive.scss";
import { useAppSelector } from "@/hooks/redux";
import SessionSelectors from "@/redux/session/selectors";
import { Navigate } from "react-router-dom";
import routePaths from "@/config/routePaths";

const Layout = () => {
  const token = useAppSelector(SessionSelectors.SelectToken);

  if (!token) {
    return <Navigate to={routePaths.login} />;
  }

  return (
    <div>
      <Main />
    </div>
  );
};

export default Layout;
