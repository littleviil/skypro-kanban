import PopExit from "../components/popus/PopExit/PopExit";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ExitPage = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    setIsAuth(false);
    navigate("/login");
  };

  return (
    <PopExit isOpen={true} onClose={handleClose} onLogout={handleLogout} />
  );
};

ExitPage.propTypes = {
  setIsAuth: PropTypes.func.isRequired,
};

export default ExitPage;
