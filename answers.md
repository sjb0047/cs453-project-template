# Checkpoint 1 Reflection Answers


## 1. What is the difference between an in-memory API and a database-backed API?
An in-memory API stores data only while the application is running, while a database-backed API stores data in a database such as PostgreSQL. This allows the data to persist between server restarts and making it available to all clients that connect to the application.

## 2. Why is it useful to separate routes, services, and database logic?
Separating these three makes the project easier to maintain and extend. Route handlers are responsible for processing HTTP requests and responses, services contain the application's business logic, and the database logic manages communication. Separation like this keeps each file focused on a single responsibility.

## 3. What HTTP status codes did you use, and why?
I used:
200 OK for successful requests like retrieving tasks.
201 Created when a new task is successfully created.
204 No Content when a task is successfully deleted.
400 Bad Request when the client sends invalid input.
404 Not Found when a requested task does not exist.
500 Internal Server Error if an unexpected server or error occurs.

## 4. What happens when a client requests a task ID that does not exist?
When the API queries the database and no matching task is found, the service returns no result. The route responds with a **404 Not Found** status and error message indicating that the task was not found.

## 5. What was the hardest part of connecting the API to PostgreSQL?
The most challenging part was configuring the local development environment so that the API, Docker container, PostgreSQL database, and environment all worked together correctly and uniformly.