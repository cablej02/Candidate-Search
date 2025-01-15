import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center">
      <Nav />
      <main >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
