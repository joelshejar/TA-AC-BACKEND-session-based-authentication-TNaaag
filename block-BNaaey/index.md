writeCode

Implement login for the previously registered user which have been generated in previous sections

- handle a GET request on `/users/login` to render the login form which should accept

  - email
  - password

- handle a POST request on `users/login` where we verify the login credentials passed by the user

- after a successful login attempt, create a session for each logged in user & redirect to `/dashboard` page by creating one

- persist logged in session information on server side using connect-mongo

##### Note:-

Remember to add session middleware in app.js before proceeding with the login steps
