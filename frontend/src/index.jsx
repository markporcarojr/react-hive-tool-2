// index.jsx
import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./scss/styles.scss";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// import React from "react";
// import { createRoot } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "react-auth-kit";
// import createStore from "react-auth-kit/createStore";
// import App from "./App.jsx";
// import "./scss/styles.scss";

// const store = createStore({
//   authName: "_auth",
//   authType: "cookie",
//   cookieDomain: window.location.hostname,
//   cookieSecure: false,
// });

// const rootElement = document.getElementById("root");

// if (rootElement) {
//   createRoot(rootElement).render(
//     <React.StrictMode>
//       <AuthProvider store={store}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </AuthProvider>
//     </React.StrictMode>
//   );
// } else {
//   console.error("Root element not found in the DOM.");
// }
