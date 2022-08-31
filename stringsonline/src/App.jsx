import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { AppRouter } from "./Components/App/Router/Router";
import { Footer } from "./Components/Partials/Footer";
import { Header } from "./Components/Partials/Header";
import { Main } from "./Components/Partials/Main";
import { NavBarLeft } from "./Components/Partials/NavBarLeft";

function App() {
  return (
    <BrowserRouter>
      {/* Page Container til at centrere sitet */}
      <div className="pageContainer">
        <Header />
        <Main>
          <nav>
            <NavBarLeft />
          </nav>
          <section>
            <AppRouter />
          </section>
        </Main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
