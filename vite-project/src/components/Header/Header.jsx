import React, { useState, useEffect } from 'react'
import {
  HeaderPage,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  HeaderUser,
} from './Header.styled'
import { Container } from '../../App.styled'
import PopUser from '../popus/PopUser/PopUser'
import { useNavigate } from 'react-router-dom'

export const Header = ({ onNewCardClick }) => {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false)
  const [userName, setUserName] = useState('Пользователь')
  const navigate = useNavigate()

  useEffect(() => {
    const name = localStorage.getItem('name')
    if (name) {
      setUserName(name)
    }
  }, [])

  const togglePopUser = (e) => {
    e.preventDefault()
    setIsPopUserOpen((prev) => !prev)
  }

  const handleExitClick = () => {
    navigate('/logout')
  }

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
                onExitClick={handleExitClick}
              />
            )}
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderPage>
  )
}
