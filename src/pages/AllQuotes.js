import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const Dummy_quotes = [
  { id: "q1", author: "Van", text: "Learning React is fun" },
  { id: "q2", author: "Nguyen", text: "Learning JS is fun" },
  { id: "q3", author: "AHIHI", text: "Learning python is fun" },
];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedData,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focus">{error}</p>;
  }

  if (status === "completed" && (!loadedData || loadedData.length === 0)) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadedData} />;
};
export default AllQuotes;
