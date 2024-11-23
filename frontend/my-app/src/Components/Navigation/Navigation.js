// navigation.js

import React from 'react';
import styled from 'styled-components';
import ikonka from '../../img/ikonka.png';
import ikonka2 from '../../img/ikonka2.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext'

function Navigation({ active, setActive }) {
  const { setIncomes, setExpenses } = useGlobalContext();  
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail'); 
    setIncomes([]);
    setExpenses([]);
    navigate('/login');
  };

  return (
    <NavStyled>
      <UserContainer>
        <img src={ikonka2} alt="" />
        <div className="text">
          <h2>Витрати і доходи</h2>
          <p>{userEmail}</p>
        </div>
      </UserContainer>
      <MenuItems>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            <Link to={item.link}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </MenuItems>
      <BottomNav>
        <li onClick={handleLogout}>
          {signout} Вийти
        </li>
      </BottomNav>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: #1e1e2f; /* Темний фон */
  border: 3px solid #2e2e3f; /* Злегка світліший темний колір */
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const UserContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    background: #2e2e3f; /* Злегка світліший темний колір */
    border: 2px solid #00ffcc; /* Зелений акцент */
    padding: 0.2rem;
    box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
  }
  h2 {
    color: #ffffff; /* Білий текст */
  }
  p {
    color: #00ffcc; /* Зелений акцент */
  }
`;

const MenuItems = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: #ffffff; /* Білий текст */
    padding: 0.5rem 1rem;
    position: relative;
    a {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;
    }
    &:hover {
      color: #00ffcc; /* Зелений акцент */
      i {
        color: #00ffcc; /* Зелений акцент */
      }
    }
  }
  .active {
    color: #00ffcc !important; /* Зелений акцент */
    i {
      color: #00ffcc !important; /* Зелений акцент */
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #00ffcc; /* Зелений акцент */
      border-radius: 0 10px 10px 0;
    }
  }
`;

const BottomNav = styled.div`
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: #ffffff; /* Білий текст */
    padding: 0.5rem 1rem;
    position: relative;
    &:hover {
      color: #00ffcc; /* Зелений акцент */
    }
  }
`;

export default Navigation;
