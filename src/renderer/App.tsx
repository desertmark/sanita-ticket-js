import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';
import { HomeView } from './views/Home';
import { Providers } from './Providers';
import { Layout } from './components/Layout';
import { HistoryView } from './views/History';

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
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/history" element={<HistoryView />} />
        </Routes>
      </Layout>
    </>
  );
};
