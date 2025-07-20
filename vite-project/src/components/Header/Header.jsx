import React, { useState, useEffect } from 'react';
import {
  HeaderPage,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  HeaderUser,
} from './Header.styled';
import { Container } from '../../App.styled';
import PopUser from '../popus/PopUser/PopUser';

export const Header = ({ onNewCardClick, setIsAuth }) => {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const [userName, setUserName] = useState('Пользователь');

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setIsAuth(false);
  };

  const togglePopUser = (e) => {
    e.preventDefault();
    setIsPopUserOpen((prev) => !prev);
  };

  return (
    <HeaderPage>
      <Container>
        <HeaderBlock>
          <HeaderLogo className="_show _light">
            <a href="/" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderLogo className="_dark">
            <a href="/" target="_self">
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
              {userName}
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
