import { useState } from 'react';
import { PopUser } from '../popus/PopUser/PopUser'; // Убедись, что путь правильный

export const Header = ({ onNewCardClick }) => {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo _show _light">
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </div>
          <div className="header__logo _dark">
            <a href="" target="_self">
              <img src="images/logo_dark.png" alt="logo" />
            </a>
          </div>
          <nav className="header__nav" style={{ position: 'relative' }}>
            <button
              className="header__btn-main-new _hover01"
              onClick={onNewCardClick}
            >
              Создать новую задачу
            </button>
            <a
              href="#user-set-target"
              className="header__user _hover02"
              onClick={() => setIsPopUserOpen(true)}
            >
              Ivan Ivanov
            </a>
            {isPopUserOpen && (
              <PopUser
                isOpen={isPopUserOpen}
                onClose={() => setIsPopUserOpen(false)}
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};