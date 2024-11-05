import React from 'react';
import styles from './Header.module.css';
import ilanChurch from '../../assets/wavesSystem.png';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../hooks/Theme/Theme';
import Switch from 'react-switch';

const Header = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <header className={styles.headerBg}>
      <ul className={`${styles.networks} container`}>
        <li>
          <a href="https://api.whatsapp.com/send?phone=5521974281528">
            21 9 7428-1528
          </a>
        </li>
        <li>
          <a href="mailto:secretaria@ilan.org.br">secretaria@ilan.org.br</a>
        </li>
        <li>
          <a href="https://www.facebook.com/ilanbrasil/">Facebook</a>
        </li>
        <li>
          <a href="https://www.instagram.com/ilanchurch/">Instagram</a>
        </li>
      </ul>
      <nav className={`container`}>
        <img src={ilanChurch} alt="Ilan Church" width="300" height="200" />
        <ul className={`${styles.menu}`}>
          <NavLink to="/ondas/" end>
            Home
          </NavLink>
          <NavLink to="/ondas/ficha-de-inscricao">Ficha de inscrição</NavLink>
          <NavLink to="/ondas/admin">Administração</NavLink>
          <NavLink to="/ondas/checkin">Checkin</NavLink>
          <NavLink to="/ondas/cadastro">Cadastro/Atualização</NavLink>
          <NavLink to="/ondas/buscarPessoasChamada">
            Buscar Pessoa Chamada
          </NavLink>
          {/* <NavLink to="/ondas/certificado">Certificado</NavLink> */}
          <NavLink to="/ondas/ficha-de-membresia">Ficha de Membresia</NavLink>
          {/* <h1>Modo dark</h1> */}
          <Switch
            onChange={toggleTheme}
            checked={theme ? true : false}
            checkedIcon={false}
            uncheckedHandleIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor="#fff"
            onColor="#3ff"
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
