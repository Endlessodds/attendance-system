# Attendance System

A role-based attendance tracking platform that verifies presence using **QR code scanning** or **vehicle plate number recognition**.  
The scanning process is handled by **Python**, which sends the data to a **Node.js + Express** backend for validation against **MongoDB**.  
The system supports three roles—**User**, **Admin**, and **Superadmin**—each with tailored permissions.

---

##  Features

### User
- Authentication (login/register)
- QR code scan
- Notifications
- View personal information (read-only)
- Home page access
- Settings page

### Admin
- Admin login
- View recent scans with timestamps
- Receive and manage complaints

### Superadmin
- Authentication with username & password
- View user status (employee & vehicle)
- User profile photo
- Contact details (address, city, village, phone, emergency contact)
- Attendance reports & analytics with export (CSV/Excel)
- Edit users and admins
- Push notifications
- Search functionality
- Configure work times (entry/exit, late detection)
- Manage admin accounts
- **Try-out ** for occasional events

---

##  Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: Web UI for Admin & Superadmin
- **Database**: MongoDB
- **Scanning & Recognition**: Python (QR code & license plate detection)
- **API Communication**: REST

---

## Events (a feature)

Events refer to special or non-routine occurrences that may require attendance tracking but are not part of the regular daily schedule. These events are typically infrequent, occurring occasionally rather than on a daily basis.

### Examples of Events:
- **Trainings**: Skill-building sessions or courses.
- **Workshops**: Hands-on learning experiences.
- **Company Meetings**: Team or organizational gatherings.
- **Seminars**: Educational talks or discussions.

These events are important for tracking non-typical attendance.

---
##  Setup

### Prerequisites
- [Node.js](https://nodejs.org/) 
- [Python](https://www.python.org/downloads/) 
- [MongoDB](https://www.mongodb.com/try/download/community)


