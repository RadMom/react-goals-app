import React from "react";
import{useParams}from "react-router-dom"

const EventDetailPage = () => {

    const params=useParams() 
    return (
        <>
        <h1>Event Details Page</h1>
        <p>Event id: {params.eventId}</p> 
        </>
    )
};

export default EventDetailPage;