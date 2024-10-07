import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../app/user/store'
import {ToastContainer} from 'react-toastify'


const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer/>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
