import { useEffect } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const { sendRequest, status: currStatus } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (currStatus === "completed") {
      history.push("/quotes");
    }
  }, [currStatus, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm
      isLoading={currStatus === "pending"}
      onAddQuote={addQuoteHandler}
    ></QuoteForm>
  );
};
export default NewQuote;
