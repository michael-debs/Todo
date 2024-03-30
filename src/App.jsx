
import Nav from "./components/Nav";
import Main from "./components/Main";
import CookieBanner from "./components/CookieBanner";
import ListsProvider from "./contexts/ListsProvider";

function App() {
  return (
    <>
      <ListsProvider>
        <Nav />
        <Main />
      </ListsProvider>
      <CookieBanner />
    </>
  );
}

export default App;
