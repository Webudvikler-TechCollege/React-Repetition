import { Header } from './Components/Partials/Header';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './Components/Partials/Main';
import { AppRouter } from './Components/App/Router/Router';
import { Footer } from './Components/Partials/Footer';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      <Main>
        <AppRouter />
      </Main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
