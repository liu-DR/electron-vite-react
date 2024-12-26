import { HashRouter } from 'react-router-dom';
import Route from '@/routes';
import Layout from './layout';

function App() {
  return (
    <HashRouter>
      {/* <Route /> */}
      <Layout />
    </HashRouter>
  );
}

export default App;
