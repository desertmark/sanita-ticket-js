import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';
import { HomeView } from './views/Home';
import { ConfigView } from './views/Config';
import { Providers } from './Providers';
import { Layout } from './components/Layout';
import { useAppState } from './providers/AppStateProvider';

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
  const { isAdmin } = useAppState();
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          {isAdmin && <Route path="/config" element={<ConfigView />} />}
        </Routes>
      </Layout>
    </>
  );
};
