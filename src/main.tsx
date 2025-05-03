import { createRoot } from "react-dom/client";
import "./styles/main.scss"; // ← kendi main.scss dosyanı import ettin!s
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// <Provider store={store}> ile store'un bütün proje genelinde erişilebilir olmasını sağladık.
