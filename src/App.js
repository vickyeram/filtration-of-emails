import { Suspense } from 'react';
import './App.css';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Suspense fallback={<>Loading..</>}>
      <Routes />
    </Suspense>
  );
}

export default App;
