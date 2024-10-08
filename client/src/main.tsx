import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from '../app/user/store'
import {ToastContainer} from 'react-toastify'
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={ persistor} loading={null}>
        <ToastContainer/>
        <App />
        </PersistGate>
        
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
