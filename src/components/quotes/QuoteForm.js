import { useRef, useState, Fragment } from "react";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import { Prompt } from "react-router-dom/cjs/react-router-dom.min";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  let [isEnter, setIsEnter] = useState(true);
  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formIsFocus = () => {
    setIsEnter(true);
    console.log(isEnter);
  };
  const formSubmitHandler = () => {
    setIsEnter(false);
  };
  return (
    <Fragment>
      <Prompt
        when={isEnter}
        message={(location) =>
          "Are you want to leave the page, your data in the form will be lost"
        }
      />
      <Card>
        <form
          onFocus={formIsFocus}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              onFocus={formIsFocus}
              type="text"
              id="author"
              ref={authorInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              onFocus={formIsFocus}
              id="text"
              rows="5"
              ref={textInputRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={formSubmitHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
