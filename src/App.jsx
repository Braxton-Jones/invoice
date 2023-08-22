import Header from './layout/componets/Header.jsx';
import Home from './layout/views/Home.jsx';
import './sass/styles.scss';
function App() {
  return (
    <>
      <main className='light' data-testid='app-component'>
        <Header />
        <Home />
      </main>
    </>
  );
}

export default App;
