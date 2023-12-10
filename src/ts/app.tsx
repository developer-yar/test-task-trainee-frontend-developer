import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state/store";
import { Reset } from "./components/reset";
import { AppContainer } from "./components/appContainer";
import { Notes } from "./pages/notes";
import { Tags } from "./pages/tags";
import { Filter } from "./pages/filter";

const App = (): JSX.Element => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Reset />
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/filter" element={<Filter />} />
          </Routes>
        </Router>
      </AppContainer>
    </PersistGate>
  </Provider>
);

createRoot(document.getElementById("app")).render(<App />);
