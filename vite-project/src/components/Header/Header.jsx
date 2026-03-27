import React, { useState, useEffect, useContext } from 'react'
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
import { ThemeContext } from '../../context/ThemeContext'

export const Header = ({ onNewCardClick }) => {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false)
  const [userName, setUserName] = useState('Пользователь')
  const navigate = useNavigate()
  const { isDark } = useContext(ThemeContext)

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
          <HeaderLogo>
            <a href="/" target="_self">
              <img src={isDark ? "images/logo_dark.png" : "images/logo.png"} alt="logo" />
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
