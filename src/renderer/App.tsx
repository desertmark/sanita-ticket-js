import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeView } from './views/Home';
import { Providers } from './Providers';
import { Layout } from './components/Layout';
import { CssBaseline } from '@mui/joy';
import { HistoryView } from './views/History';

export default function App() {
  return (
    <Providers>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeView />} />
          </Routes>
          <Routes>
            <Route path="/history" element={<HistoryView />} />
          </Routes>
        </Layout>
      </Router>
    </Providers>
  );
}
