import React from 'react';
import Header from './layout/componets/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './layout/views/Home.jsx';
import View from './layout/views/View.jsx';
import './sass/styles.scss';

function App() {
  return (
    <>
      <main className='light' data-testid='app-component'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
