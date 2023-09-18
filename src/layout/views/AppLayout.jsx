import logo from '../../assets/logo.png';
import sun from '../../assets/icon-sun.svg';
import moon from '../../assets/icon-moon.svg';
import profile from '../../assets/image-avatar.jpg';
import '../../sass/views_styling/_appLayout.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
function AppLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the theme
  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }
  return (
    <>
      <main className={isDarkMode ? 'dark' : 'light'}>
        <header>
          <img src={logo} className='logo' />
          <div className='icon-wrapper'>
            <img src={moon} className='toggle' onClick={toggleTheme} />
            <span></span>
            <img src={profile} className='profile' />
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
