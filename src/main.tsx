import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/utils/i18n.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom"
            buttonPosition="bottom-right"
          />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
