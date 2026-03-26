# IITB Club Events Web App
This is a React-based web application where IITB students can browse and register for club events using ITC SSO authentication.

## Features
- IITB SSO Login
- Fetch user details (name, roll number, department, degree)
- Monthly event calendar
- Event details on click
- Event registration
- My Schedule view
- Prevent duplicate registrations
- 1-hour session handling using localStorage

## Tech Stack
- React.js
- FullCalendar
- JavaScript
- HTML/CSS
- ITC SSO API

## Key Functions

### login()
Redirects the user to the IITB SSO authentication page using the project ID.

### fetchUser(accessid)
Fetches authenticated user details from the ITC SSO API using the access ID returned after login. The user data is then stored in React state and saved in localStorage for session management.

### logout()
Logs the user out by clearing user data from React and removing session information stored in localStorage.

### handleEventClick(info)
Triggered when a user clicks an event in the calendar. It finds the corresponding event from the events list and displays its details.

### handleRegister()
Registers the logged-in user for the selected event. It checks for duplicate registrations before adding the event to the user's schedule.

### useEffect()
Handles login session logic when the app loads. It checks for the SSO access ID in the URL, fetches user data if present, and restores the session from localStorage if it hasn't expired.


## Setup Instructions
1. Clone the repository

```
git clone https://github.com/stutimahajan234/iitb_club_events.git
```

2. Navigate to the project folder

```
cd iitb_club_events
```

3. Install dependencies

```
npm install
```

4. Start the development server

```
npm start
```

The application will run on:

```
http://localhost:3000
```

## SSO Integration
The application integrates IITB SSO using:

```
https://sso.tech-iitb.org/project/{PROJECT_ID}/ssocall/
```

After login, an `accessid` is returned which is used to fetch user data from:

```
https://sso.tech-iitb.org/project/getuserdata
```

User session data is stored in `localStorage` and expires after 1 hour.

