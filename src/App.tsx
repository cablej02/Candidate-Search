import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { SavedCandidatesProvider } from './components/SavedCandidatesContext';

function App() {
  return (
    <SavedCandidatesProvider>
        <div>
            <Nav />
            <main className="d-flex flex-column align-items-center justify-content-start text-center">
                <Outlet />
            </main>
        </div>
    </SavedCandidatesProvider>
  );
}

export default App;
