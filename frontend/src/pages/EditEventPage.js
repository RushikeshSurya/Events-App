import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm.js";

export default function EditEvent() {
  const data = useRouteLoaderData("event-details");

  return <EventForm method="PATCH" event={data.event} />;
}
