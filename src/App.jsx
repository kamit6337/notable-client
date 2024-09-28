import "./App.css";
import Router from "./routes/Router";
import ReactGA from "react-ga4";
import * as Sentry from "@sentry/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

Sentry.init({
  dsn: "https://87656cf037342f8bc97274102135bddf@o4507616912736256.ingest.us.sentry.io/4507618105425920",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
