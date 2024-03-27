import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Customers from './components/Customers';
import { Container } from "@mui/material";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Customers />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
