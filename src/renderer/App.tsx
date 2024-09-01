import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';
import { HomeView } from './views/Home';
import { Providers } from './Providers';
import { Layout } from './components/Layout';
import { HistoryView } from './views/History';
import { useAppState } from './providers/AppStateProvider';
import { LoginView } from './views/Login';

export default function App() {
  return (
    <Router>
      <Providers>
        <AppContent />
      </Providers>
    </Router>
  );
}

const AppContent = () => {
  const { isAuthenticated } = useAppState();
  return (
    <>
      <CssBaseline />
      <Layout>
        {isAuthenticated() ? (
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/history" element={<HistoryView />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginView />} />
          </Routes>
        )}
      </Layout>
    </>
  );
};
