import { useState } from 'react';
import {
  HeaderPage,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  HeaderUser,
} from './Header.styled';
import { Container } from '../../App.styled';
import { PopUser } from '../popus/PopUser/PopUser';

export const Header = ({ onNewCardClick }) => {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);

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
            <HeaderBtnMainNew className="_hover01" onClick={onNewCardClick}>
              Создать новую задачу
            </HeaderBtnMainNew>
            <HeaderUser
              as="a"
              href="#user-set-target"
              className="_hover02"
              onClick={() => setIsPopUserOpen(true)}
            >
              Ivan Ivanov
            </HeaderUser>
            {isPopUserOpen && <PopUser onClose={() => setIsPopUserOpen(false)} />}
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderPage>
  );
};