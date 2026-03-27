import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import {
  PopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  PopUserSetBtn,
} from "./PopUser.styled";

const PopUser = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setName(localStorage.getItem("name") || "Пользователь");
    setEmail(localStorage.getItem("email") || "неизвестно");
  }, []);

  const handleExitClick = () => {
    logout();
    onClose();
  };

  return (
    <div className="pop-user-overlay" onClick={onClose}>
      <PopUserSet id="popUserSet" onClick={(e) => e.stopPropagation()}>
        <PopUserSetName>{name}</PopUserSetName>
        <PopUserSetMail>{email}</PopUserSetMail>
        <PopUserSetTheme>
          <p>Темная тема</p>
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        </PopUserSetTheme>
        <PopUserSetBtn onClick={handleExitClick}>Выйти</PopUserSetBtn>
      </PopUserSet>
    </div>
  );
};

export default PopUser;
