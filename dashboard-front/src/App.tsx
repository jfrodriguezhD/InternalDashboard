import Control from "./control/Control";
import "./App.css";
import Header from "./Header/Header";

function App() {
  return (
    <>
      <Control />
      <div>
        <Header />
        <Main>
          <Control />
          <Roster />
        </Main>
      </div>
    </>
  );
}

export default App;
