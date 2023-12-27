import EventsList from "../components/EventsList";

function Events() {
  return <EventsList />;
}

export default Events;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not load events" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
