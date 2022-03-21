# EverMyNote

## EverMyNote at a Glance

EverMyNote is a full stack app that allows users to create, read, update and delete their notebooks and notes. It is very convenient for the users to manage their study notes either for onsite study or remote study.

## Application Architecture

EverMyNote is built on a React frontend with an Python backend, using PostgreSQL as a database.

## Frontend Overview
EverMyNote uses an React and Redux to create components for the frontend.

### Frontend Technologies Used

#### React
EverMyNote is a React application. All display logic is handled by the React libraries.
#### Redux
EverMyNote makes extensive use of Redux. All states management is handled with Redux, and thunk functions makes API calls to the backend server for data.

## Backend Overview
EverMyNote uses an Python(Flask) server based on Docker container with a PostgreSQL database. It also use Flask-session to store users specific information.

### Backend Technologies Used
#### SQLAlchemy
EverMyNote use Flask-SQLAlchemy do create the models, interact with the database and Query data.
#### Alembic
EverMyNote use Alembic to migrate the database, and update the database.
#### PostgreSQL 
PostgreSQL is the the database of choice because it is simple to work with.

## Next Step
Search may be a good feature for next step because the users can use search to get the access to the notebook and notes very quickly. Also, share may be a good feature too because the users can share their notes with their friends, and it will build the connections between the users.

## Screenshots
![Screen Shot 2022-03-21 at 1 56 41 PM](https://user-images.githubusercontent.com/85038267/159362713-271919af-51cb-4e6b-a80e-d07660798d99.png)


![Screen Shot 2022-03-21 at 1 57 05 PM](https://user-images.githubusercontent.com/85038267/159362754-a34f210b-110c-47a5-a974-05ad6089182d.png)



