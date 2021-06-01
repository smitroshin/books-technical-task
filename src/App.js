import Router from './router';
import routes from './router/routes';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router routes={routes} />
    </div>
  );
}

export default App;
