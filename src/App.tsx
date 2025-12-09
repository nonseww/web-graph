import { Main } from './features/pages/Main';
import { NotificationProvider } from './services/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Main />
    </NotificationProvider>
  );
}

export default App;
