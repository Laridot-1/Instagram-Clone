import React from "react"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <section className="page error-page">
      <h2>Sorry, this page isn't available.</h2>
      <div>
        <p>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
        <Link to="/">Go back to Instagram.</Link>
      </div>
    </section>
  )
}

export default ErrorPage
