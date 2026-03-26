import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function App() {
  const PROJECT_ID = "511ef5da-94e0-4f8a-9a2d-cab961033908";

  const login = () => {
    window.location.href = 
    `https://sso.tech-iitb.org/project/${PROJECT_ID}/ssocall/`;
  };

  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState("calendar");

  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessid = params.get("accessid");

    if(accessid) {
      fetchUser(accessid);
    } else {
    
    const storedUser = localStorage.getItem("user");
    const loginTime = localStorage.getItem("loginTime");

    if (storedUser && loginTime) {
      const now = Date.now();
      const diff = now - loginTime;

      if (diff < 60 * 60 * 1000) {
        
        setUser(JSON.parse(storedUser));
      } else {
        logout();
      }
    }
  }
  },[]);

  const fetchUser = async (accessid) => {
  const res = await fetch(
    "https://sso.tech-iitb.org/project/getuserdata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: accessid }),
      
    }
  );

  const data = await res.json();
  setUser(data);
  window.history.replaceState({}, document.title, "/");
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("loginTime", Date.now());
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("loginTime");
  alert("Session expired. Please login again.");
};

  const events = [
    {
      title: "Coding Hackathon",
      date: "2026-04-05",
      club: "Web and Coding Club",
      time: "8:30 PM",
      venue: "LC101",
      color: "blue"
    },
    {
      title: "Mathathon",
      date: "2026-04-14",
      club: "Maths and Physics Club",
      time: "9:00 PM",
      venue: "LC001",
      color: "red"
    },
    {
      title: "RC Plane Workshop",
      date: "2026-05-05",
      club: "Aeromodelling Club",
      time: "7:00 PM",
      venue: "LA002",
      color: "green"
    },
    {
      title: "XLR8 Orientation",
      date: "2026-04-20",
      club: "Electronics and Robotics club",
      time: "9:00 PM",
      venue: "LA202",
      color: "purple"
    },
    {
      title: "BioEngineering GC",
      date: "2026-05-01",
      club: "BioX Club",
      time: "6:00 PM",
      venue: "LC101",
      color: "orange"
    }
  ];

  // When user clicks event
  const handleEventClick = (info) => {
    const clicked = events.find(
      (e) => e.title === info.event.title
    );
    setSelectedEvent(clicked);
  };

  // Register button logic
  const handleRegister = () => {

    if (!user) {
      alert("Please login first");
      return;
    }
  

    if (!selectedEvent) return;

    const alreadyRegistered = registeredEvents.some(
      (e) => e.title === selectedEvent.title
    );

    if (!alreadyRegistered) {
      setRegisteredEvents([...registeredEvents, selectedEvent]);
      alert("Registered for " + selectedEvent.title);
    } else {
      alert("Already registered!");
    }
  };

  if (!user) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>IITB Club Events</h1>
        <p>Please login using IITB SSO to continue</p>
        <button onClick={login}>Login with SSO</button>
      </div>
    );
  }

  return (
    
    <div style={{ padding: "40px" }}>
      <h1>IITB Club Events</h1>
      <button onClick={login}>Login with SSO</button>

      {user && (
        <div>
          
          <h3>Welcome {user.name}</h3>
          <p>Roll: {user.roll}</p>
          <p>Dept: {user.department}</p>
          <p>Degree: {user.degree}</p>

          <button onClick={logout} style={{ marginTop: "10px" }}>
            Logout
          </button>
        </div>
      )}

      <div style={{ margin: "20px 0" }}>
        
        <button onClick={() => setView("calendar")}>
        Calendar View
        </button>

        <button onClick={() => setView("schedule")}>
        My Schedule
        </button>
      </div>

      {view === "calendar" ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            ...events.map((e) => ({
              title: e.title,
              date: e.date,
              color: e.color
            })),
            
          ]}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth"
          }}
  />
) : (
  <div>
    <h2>My Schedule</h2>

    {registeredEvents.length === 0 ? (
      <p>No events registered</p>
    ) : (
      <ul>
        {registeredEvents.map((event, index) => (
          <li key={index}>
            <b>{event.title}</b> — {event.date}  
            <br />
            {event.time} | {event.venue}
          </li>
        ))}
      </ul>
    )}
  </div>
)}
  


      {/* Event Details Panel */}
      {selectedEvent && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid gray",
            padding: "15px"
          }}
        >
          <h2>{selectedEvent.title}</h2>
          <p><b>Club:</b> {selectedEvent.club}</p>
          <p><b>Time:</b> {selectedEvent.time}</p>
          <p><b>Venue:</b> {selectedEvent.venue}</p>

          <button onClick={handleRegister}>Register</button>
        </div>
      )}

      
    </div>
  );
}

export default App;