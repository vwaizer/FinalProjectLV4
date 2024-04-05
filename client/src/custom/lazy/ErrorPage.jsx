import React from 'react'

const ErrorPage = ({error, resetErrorBoundary}) => {
  return (
    <div>
       <p>Somthing went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

export default ErrorPage
