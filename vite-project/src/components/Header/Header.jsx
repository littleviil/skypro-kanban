import { useNavigate } from 'react-router-dom';
import {
  HeaderPage,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  HeaderUser,
} from './Header.styled';
import { Container } from '../../App.styled';

export const Header = ({ onNewCardClick, setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setIsAuth(false);
    navigate('/login');
  };

  return (
    <HeaderPage>
      <Container>
        <HeaderBlock>
          <HeaderLogo className="_show _light">
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderLogo className="_dark">
            <a href="" target="_self">
              <img src="images/logo_dark.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderNav style={{ position: 'relative' }}>
            <HeaderBtnMainNew onClick={onNewCardClick}>
              Создать новую задачу
            </HeaderBtnMainNew>
            <HeaderUser as="a" href="#logout" onClick={handleLogout}>
              Выйти
            </HeaderUser>
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderPage>
  );
};