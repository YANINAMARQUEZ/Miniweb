import Header from './Header';
import './Layout.css';

const MainLayout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="main-content">{children}</main>
  </div>
);

export default MainLayout;
