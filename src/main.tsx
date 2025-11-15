import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import { persistor, store } from "./redux/store";
import { Router } from "./routes/Router";
import { ThemeProvider } from "./components/ThemeProvider";

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
