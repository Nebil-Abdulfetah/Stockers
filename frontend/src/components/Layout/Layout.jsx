import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths = ["/login"];

  return hideLayoutPaths.includes(location.pathname) ? (
    <>{children}</>
  ) : (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;