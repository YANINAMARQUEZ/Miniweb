import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="logo">
      <h1>MiniWeb Express</h1>
      <span className="slogan">Generador institucional editable</span>
    </div>
    <nav className="nav">
      <Link to="/">Inicio</Link>
      
    </nav>
  </header>
);

export default Header;
