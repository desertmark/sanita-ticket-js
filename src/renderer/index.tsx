import './libs/sentry';
import '@fontsource/inter';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import { getSupabase } from './libs/supabase';
import { RootStore } from './stores/root.store';
import { StoreProvider } from './providers/StoreProvider';

async function bootstrap() {
  const supabase = await getSupabase();
  const store = new RootStore(supabase);
  const container = document.getElementById('root') as HTMLElement;
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </StrictMode>,
  );
}

bootstrap();
