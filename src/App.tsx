import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Nav />
      <main className="d-flex flex-column align-items-center justify-content-start text-center">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
