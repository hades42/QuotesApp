import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import Layout from "./components/layout/layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const SingleQuote = React.lazy(() => import("./pages/SingleQuote"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes></AllQuotes>
          </Route>

          <Route path="/quotes/:quoteId">
            <SingleQuote></SingleQuote>
          </Route>

          <Route path="/new-quote">
            <NewQuote></NewQuote>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
