import PopUser from "../components/popus/PopUser";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const UserPage = ({ setIsAuth }) => {
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
      <PopUser
        onClose={handleClose}
        onLogout={handleLogout}
      />
    </div>
  );
};

UserPage.propTypes = {
  setIsAuth: PropTypes.func.isRequired,
};

export default UserPage;