# Device Activity Tracker

This is a Full-Stack Web Application built for the Invisam Developer Internship Assessment.

## 🚀 Setup Instructions

### 1. Backend
1. Navigate to `backend` folder.
2. Run `npm install` then `node server.js`.
3. Server runs on http://localhost:3000

### 2. Frontend
1. Navigate to `frontend` folder.
2. Open `index.html`.

---

## 🔒 API Documentation & Authentication
[cite_start]The entire API requires a secret key for access[cite: 67].

### Authentication Requirement
[cite_start]Every request must include the following header[cite: 67, 68, 69]:
* **Header:** `x-api-key`
* **Value:** `12345`

### Endpoints (APIs)
| Method | Endpoint | Description | Expected Body/Response |
| :--- | :--- | :--- | :--- |
| [cite_start]**POST** [cite: 14] | `/devices` | Registers a new device. | [cite_start]`{ "deviceId": "...", "name": "...", "type": "..." }` [cite: 17, 18, 19, 20] |
| [cite_start]**GET** [cite: 58] | `/devices` | Lists all registered devices. | [cite_start]`[ {deviceId: ..., name: ...}, ... ]` [cite: 61, 62, 63, 64, 65] |
| [cite_start]**POST** [cite: 30] | `/devices/:deviceId/activity` | Records activity data for a device. | [cite_start]`{ "temperature": ..., "battery": ..., "timestamp": "..." }` [cite: 33, 34, 35, 36] |
| [cite_start]**GET** [cite: 46] | `/devices/:deviceId/activity/latest` | Retrieves the latest status of a device. | [cite_start]`{deviceId: ..., temperature: ..., battery: ..., timestamp: ...}` [cite: 50, 51, 52, 53] |

---

## ✅ Features
- Register devices
- View activity dashboard
- Search and filter devices
- [cite_start]View latest activity details (temperature, battery, timestamp) [cite: 89]
- [cite_start]Basic responsiveness for desktop and mobile [cite: 97]

---

