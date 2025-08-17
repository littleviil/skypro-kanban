import PopExit from "../components/popus/PopExit/PopExit";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ExitPage = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <div>
      <PopExit
        onClose={handleClose}
        onLogout={handleLogout}
      />
    </div>
  );
};

ExitPage.propTypes = {
  setIsAuth: PropTypes.func.isRequired,
};

export default ExitPage;