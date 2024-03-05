import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="error">
      <h1>Oops!</h1>
      <p>Sorry, an error has occured !</p>
      <br />
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
