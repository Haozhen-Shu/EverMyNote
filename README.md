# EverMyNote

EverMyNote is a full stack app that allows users to create, read, update and delete their notebooks and notes. It is very convenient for the users to manage their study notes.

## Application Architecture

EverMyNote is built on a React frontend with an Python backend, using PostgreSQL as a database.

## Frontend Overview

### Frontend Technologies Used
#### React
EverMyNote is a React application. All display logic is handled by the React libraries.
#### Redux
EverMyNote makes extensive use of Redux. All states management is handled with Redux, and thunk functions makes API calls to the backend server for data.

### Backend Overview

EverMyNote uses an Python(Flask) server based on Docker container with a PostgreSQL database.

#### SQLAlchemy
EverMyNote use SQLAlchemy do build the models.
#### Alembic
EverMyNote use Alembic to migrate the database.

## Next Step
Search may be a good feature for next step.
