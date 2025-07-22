import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';
import { HomeView } from './views/Home';
import { HomeViewV2 } from './views/HomeV2';
import { Providers } from './Providers';
import { Layout } from './components/Layout';
import { HistoryView } from './views/History';
import { useAppState } from './providers/AppStateProvider';
import { LoginView } from './views/Login';
import { HomeStateProvider } from './providers/HomeStateProvider';
import { HistoryStateProvider } from './providers/HistoryStateProvider';
import '@fontsource/space-grotesk';

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
            <Route
              path="/"
              element={
                <HomeStateProvider>
                  <HomeView />
                </HomeStateProvider>
              }
            />
            <Route
              path="/history"
              element={
                <HistoryStateProvider>
                  <HistoryView />
                </HistoryStateProvider>
              }
            />
            <Route
              path="/homev2"
              element={
                <HomeStateProvider>
                  <HomeViewV2 />
                </HomeStateProvider>
              }
            />
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
