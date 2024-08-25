In this project, let's build an **Blogs App** by applying the various concepts.

### Set Up Instructions

<details>
<summary>Click to view</summary>

### 1.How to start client side application.
- In this client side application, firstly   created a basic React Project by taking simple commend **npx create-react-app appname**.  
- Download dependencies by running `npm install`
- Start up the app using `npm start`
- Server starts on 3000 port number automatically.   
- we created seperate folder structure for components in src folder where we have different components.

### 2.How to start Server side application.
- In this server side application, create one seperarte folder for server.
- Here created on server side project by taking simple command like **npx express-generator appname**
- also installed cors(),body-parser,sqlite,sqlite3

</details>

### Completion Instructions

<details>
<summary>Functionality that added</summary>
<br/>

The app has the following functionalities

- Initially, the list of posts from blogs table loaded from server-side by **GET api**
- When click on post add icon then it navigate to form set up where we can add posts and delete posts 
  - After doing api calls from here we will get response status whether successful or not.
  - Loader view, failure view and success view displayed based on api status.
  - Post add component **Post** api and **DELETE** api has done.
- Coming to post edit component in which PUT api has taken we also displayed different components based on api status.
- When click on Blog post item then it navigate to other component called blog details view
- Here **GET/:id** api call has done.

    ## server side
    - Opened the database connection and written all api calls in **app.js** file
    - Sending corresponding data based on api call.
    - Here server starts on **8000** port number.

</details>

<details>
<summary>Api's </summary>

- [http://localhost:8000](http://localhost:8000)
- [http://localhost:8000/list/:id](http://localhost:8000/list/:id)
- [http://localhost:8000/list/add](http://localhost:8000/list/add)
- [http://localhost:8000/list/edit/:id](http://localhost:8000/list/edit/:id)
- [http://localhost:8000/list/delete](http://localhost:8000/list/delete)



</details>







