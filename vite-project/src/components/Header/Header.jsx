import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderPage, HeaderBlock, HeaderLogo, HeaderNav, HeaderBtnMainNew, HeaderUser } from './Header.styled';
import { Container } from '../../App.styled';
import { PopUser } from '../popus/PopUser/PopUser';

export const Header = ({ onNewCardClick, setIsAuth, isAuthPage }) => {
  const navigate = useNavigate();
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);

  const handleLogout = () => {
    setIsAuth(false);
    navigate('/login');
  };

  const togglePopUser = (e) => {
    e.preventDefault();
    setIsPopUserOpen((prev) => !prev);
  };

  if (isAuthPage) {
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
          </HeaderBlock>
        </Container>
      </HeaderPage>
    );
  }

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
            <HeaderUser
              as="a"
              href="#user-set-target"
              onClick={togglePopUser}
            >
              Lenoooliym
            </HeaderUser>
            {isPopUserOpen && (
              <PopUser
                onClose={() => setIsPopUserOpen(false)}
                onExitClick={handleLogout}
              />
            )}
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderPage>
  );
};