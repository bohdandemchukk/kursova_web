import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { Login, Register } from './Components/AuthPage/AuthPage';
import { useGlobalContext } from './context/globalContext';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const isAuthenticated = !!localStorage.getItem('token');

  return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          {isAuthenticated ? <Navigation active={active} setActive={setActive} /> : null}
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/income" element={isAuthenticated ? <Income /> : <Navigate to="/login" />} />
              <Route path="/expenses" element={isAuthenticated ? <Expenses /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </main>
        </MainLayout>
      </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
