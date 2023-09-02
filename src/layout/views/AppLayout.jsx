import logo from '../../assets/logo.png';
import sun from '../../assets/icon-sun.svg';
import moon from '../../assets/icon-moon.svg';
import profile from '../../assets/image-avatar.jpg';
import '../../sass/componets/_header.scss';
import { Outlet } from 'react-router-dom';
// Add Go Back button conditionally
function Header() {
  return (
    <>
      <main className='light'>
        <header>
          <img src={logo} className='logo' />
          <div className='icon-wrapper'>
            <img src={moon} className='toggle' />
            <span></span>
            <img src={profile} className='profile' />
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
