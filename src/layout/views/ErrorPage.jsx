import { useRouteError } from 'react-router-dom';
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <section>
      {!error ? <h1>No Page Found</h1> : <h1>Error: {error.message}</h1>}
    </section>
  );
}
