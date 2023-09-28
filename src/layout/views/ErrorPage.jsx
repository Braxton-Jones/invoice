import { useRouteError } from 'react-router-dom';
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <section>
      {!error ? <h1>No Page Found</h1> : <h1>Oh No: Something went wrong!</h1>}
    </section>
  );
}
