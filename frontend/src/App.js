import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEvent from "./pages/EditEventPage";
import ErrorPage from "./pages/Error";
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailsPage";
import Event, { loader as eventsLoader } from "./pages/EventsPage";
import EventsLayout from "./pages/EventsLayout";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/NewsLetter";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import {action as logoutAction} from "./pages/Logout.js"
import { checkAuthLoader, tokenLoader } from "./util/auth.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <Event />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-details",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                loader: checkAuthLoader,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            loader: checkAuthLoader,
            action: manipulateEventAction,
          },
        ],
      },
      ,
      {
        path: "auth",
        element: <AuthenticationPage />,
        action : authAction
      },
      {
        path: "logout",
        action: logoutAction
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
