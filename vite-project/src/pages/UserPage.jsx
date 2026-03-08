import { useNavigate } from "react-router-dom";
import PopUser from "../components/popus/PopUser/PopUser";

const UserPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleExitClick = () => {
    navigate("/logout");
  };

  return (
    <PopUser
      onClose={handleClose}
      onExitClick={handleExitClick}
    />
  );
};

export default UserPage;