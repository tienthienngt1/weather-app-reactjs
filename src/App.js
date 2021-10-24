import AppProvider from "./contexts/AppContext";
import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/cerulean/bootstrap.min.css";

function App() {
  return (
      <AppProvider>
          <Routes />
      </AppProvider>
  );
}

export default App;
