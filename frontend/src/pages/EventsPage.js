import { Await, defer, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function Events() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default Events;

export async function eventsloader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not load events" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    console.log("events from api", resData)
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: eventsloader(),
  });
}
