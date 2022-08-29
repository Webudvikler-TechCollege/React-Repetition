import { BrowserRouter } from 'react-router-dom'
import './App.scss';
import { AppRouter } from './Components/App/Router/Router';
import { Footer } from './Components/Partials/Footer';
import { Header } from './Components/Partials/Header';
import { Main } from './Components/Partials/Main';
import { NavBar } from './Components/Partials/NavBar';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Main>
        <p>Test af props.children</p>
        <AppRouter />
      </Main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
