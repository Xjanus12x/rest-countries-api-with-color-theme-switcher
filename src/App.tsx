import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="transition-colors duration-300 motion-reduce:duration-0 bg-background min-h-dvh">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
