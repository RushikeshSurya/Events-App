import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { getAuthToken } from "../util/auth";

export default function EventDetails() {
  const data = useRouteLoaderData("event-details");
  console.log("data event", data)

  return <EventItem event={data.event} />;
}

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch event data" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
    headers: {
      "Authorization": "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not Delete event data" }, { status: 500 });
  }
  return redirect("/events");
}
