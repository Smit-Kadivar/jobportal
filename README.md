<div align="center">

# Job Portal

</div>

JobPortal is a React.js and Node.js-based application that allows users to submit job applications with their CVs and retrieve submitted applications. The project uses Express.js, MongoDB, and Multer for file uploads.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technolgoies)
- [Installation](#installation)
- [APIEndpoints](#apiendpoints)
- [License](#license)

## Introduction

Job Portal is a web application built using React.js for the frontend and Node.js for the backend. It provides a simple and intuitive interface for users to submit job opening forms, with the data being stored on the backend for further processing and management.

## Features

- Submit job application forms with CV uploads.
- Store application data in MongoDB.
- Download uploaded CVs.
- Fetch all job applications.

## Technolgoies 

- React.js
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Job-Portal.git
   ```
2. Navigate to the project directory:

   ```bash
   cd jobportal
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The server will run on http://localhost:3000
   
## APIEndpoints 

### Submit Application Form (with CV upload)
- **Endpoint:** `POST /api/form`
- **Description:** Submits a job application with a CV.
- **Headers:** `Content-Type: multipart/form-data`
- **Body Parameters:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "contactnumber": "1234567890",
  "noticeperiod": "2 months",
  "joblocation": "New York",
  "currentorganization": "ABC Corp",
  "currentCTC": "50000",
  "expectedCTC": "60000",
  "experienceYearsandMonths": "5 years"
}
```
- **File:** `uploadCV` (CV in PDF/DOC format)
- **Response:**
```json
{
  "response": { "_id": "<application_id>" },
  "message": "Form Submitted successfully"
}
```
### Download Uploaded CV
- **Endpoint:** `GET /api/form/:id/download`
- **Description:** Downloads the CV of a submitted application.
- **Example:**
```sh
curl -O http://localhost:4000/api/form/65a4bc123f1b6a7891/download
```
### Get All Applications
- **Endpoint:** `GET /api/form`
- **Description:** Fetches all job applications.
- **Response:**
```json
[
  {
    "_id": "65a4bc123f1b6a7891",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "contactnumber": "1234567890",
    "noticeperiod": "2 months",
    "joblocation": "New York",
    "currentorganization": "ABC Corp",
    "currentCTC": "50000",
    "expectedCTC": "60000",
    "experienceYearsandMonths": "5 years"
  }
]
```

## License

This project is licensed under the MIT License.


---

<p align="center">Thank you for exploring <strong>Job Portal</strong>! Happy coding! 🚀</p>

   
