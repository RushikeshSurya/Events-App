import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Events, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetails, {
  loader as eventDetailsLoader,
  action as eventDetailsAction,
} from "./pages/EventDetailsPage";
import NewEvent, { action as newEventAction } from "./pages/NewEventPage";
import EditEvent from "./pages/EditEventPage";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Home from "./pages/HomePage";
import EventsLayout from "./pages/EventsLayout";

const routeElemens = createRoutesFromElements([
  <Route
    path="/"
    element={<Root />}
    children={[
      <Route index element={<Home />} />,
      <Route
        path="events"
        element={<EventsLayout />}
        children={[
          <Route index loader={eventsLoader} element={<Events />} />,
          <Route
            path=":eventId"
            loader={eventDetailsLoader}
            action={eventDetailsAction}
            id="event-details"
            children={[
              <Route index action={eventDetailsAction} element={<EventDetails />} />,
              <Route path="edit" element={<EditEvent />} />,
            ]}
          />,

          <Route path="new" element={<NewEvent />} action={newEventAction} />,
        ]}
      />,
    ]}
    errorElement={<Error />}
  />,
]);
const AppRouter = createBrowserRouter(routeElemens);
function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
