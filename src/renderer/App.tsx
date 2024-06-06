import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';
import { HomeView } from './views/Home';
import { ConfigView } from './views/Config';
import { Providers } from './Providers';
import { Layout } from './components/Layout';

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
            <Route path="/config" element={<ConfigView />} />
          </Routes>
        </Layout>
      </Router>
    </Providers>
  );
}
