import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function Error() {
  const error = useRouteError();
  let title = "An Error Occured!";
  let message = "Something Went Wrong!";
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 400) {
    title = "Error Fetching Data!";
    message = "Could not load resouces!";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
