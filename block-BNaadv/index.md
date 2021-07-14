writeCode

Create a login and registration system where a user should be able to register using a registration form with following data:

- name
- email(unique)
- password(minimum 5 characters)

Once a user registers, he should be able to login using

- email
- password

Handle the user model accordingly to save user information during registration.

#### Note:-

Hash user's password when saving into database using `bcrypt` npm module.

Handle these 3 pages:-

1. Home page where `Register` and `Login` button should be displaced.

2. Registration form which will be used to register data.

- once a user registers, redirect him to login page.

3. Login form for logging a previous registered data.

- when user login is successful, display a success message in response
- when fails, show an appropriate error message in response to the client.

Use appropraie routes to handle routing for registration and login.
