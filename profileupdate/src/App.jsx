import { Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Weather from './component/Weather';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
