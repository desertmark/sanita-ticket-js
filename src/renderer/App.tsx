import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeView } from './views/Home';
import { Providers } from './Providers';
import { Layout } from './components/Layout';
import { CssBaseline } from '@mui/joy';

export default function App() {
  return (
    <Providers>
      <CssBaseline />
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<HomeView />} />
          </Routes>
        </Router>
      </Layout>
    </Providers>
  );
}
