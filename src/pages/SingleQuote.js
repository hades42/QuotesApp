import {
  Link,
  Route,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";

const SingleQuote = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote) {
    return <p>NO QUOTE FOUND!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      ></HighlightedQuote>
      <Route exact path={`${match.path}`}>
        <div className="centered">
          <Link to={`${match.url}/comment`} className="btn--flat">
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comment`}>
        <Comments></Comments>
      </Route>
    </Fragment>
  );
};

export default SingleQuote;
