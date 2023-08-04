# Hiring App Backend for B2B Business

This repository contains the backend code for a B2B hiring application developed using Express.js, Node.js, and Mongoose. The application allows users to post jobs, view job search analytics in graphs on a weekly and monthly basis, and perform various hiring-related actions. Additionally, the backend runs cron jobs every day at midnight to update job visibility and other relevant data.

## Base URI

The backend is deployed on Render and can be accessed through the following base URI: `https://hirring-app.onrender.com/api`

## API Endpoints

### 1. Posting New Jobs

Endpoint: `POST /jobs`

Description: Allows users to post new job listings.

Request Body:
```json
{
   "name":"backend Developer",
   "location":"Jaipur",
   "posted":"2023-08-04T14:24:30Z",
   "premium":false
}
```

### 2. View All Jobs

Endpoint: `GET /jobs`

Description: Retrieves all job listings currently available in the system.

### 3. View Particular Job

Endpoint: `GET /jobs/:id`

Description: Fetches a specific job listing by providing its unique ID.

### 4. Job Search Analytics - Graph Report

Endpoint: `GET /jobs/report/all`

Description: Generates and returns job search analytics in graph format. This report includes data for all jobs, such as the number of applications received and the number of views.


### 5. Update Job Visibility

Cron Job: Runs daily at midnight.

Description: The backend automatically updates the job visibility based on the plan chosen by the user when posting a job. If the job was posted with a premium plan, its visibility is extended to 30 days; otherwise, it remains visible for only 7 days.

## Deployment

The backend is deployed on Render, and the application is accessible through the base URI mentioned above.

## Prerequisites

To set up the backend locally, you'll need the following:

1. Node.js and npm installed on your system.
2. MongoDB instance or MongoDB Atlas URI for database storage.

3. Replace the environment variables in the code with your own configurations.

   `db="YOUR ATLAS URL"`




## Local Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Configure your MongoDB URI in the appropriate configuration file.
4. Run the server using `npm run dev`.

## Contributing

Contributions to the project are welcome. If you find any issues or want to enhance the functionality, please feel free to create a pull request or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).

---

_This documentation is up-to-date as of September 2021. Please refer to the latest code and documentation for the most recent updates._