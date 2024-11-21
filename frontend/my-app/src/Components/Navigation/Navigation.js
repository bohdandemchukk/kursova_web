import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ active, setActive }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <NavStyled>
      <UserContainer>
        <img src={avatar} alt="" />
        <div className="text">
          <h2>Демчук Богдан</h2>
          <p>Бюджет</p>
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
        <li onClick={handleSignOut}>
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
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #330f00;
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
    background: #fcf6f9;
    border: 2px solid #330f00;
    padding: 0.2rem;
    box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
  }
  h2 {
    color: rgba(34, 34, 96, 1);
  }
  p {
    color: rgba(34, 34, 96, 0.6);
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
    color: rgba(34, 34, 96, 0.6);
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
      color: rgba(34, 34, 96, 1);
      i {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
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
    color: rgba(34, 34, 96, 0.6);
    padding: 0.5rem 1rem;
    position: relative;
    &:hover {
      color: rgba(34, 34, 96, 1);
    }
  }
`;

export default Navigation;
