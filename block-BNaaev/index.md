writeCode

1. Create a registration system where a user should be able to register using a registration form with following data:

- name
- email(unique)
- password
- age
- phone

2. Handle a GET request on `/users/register` where render the registration form

3. Handle a POST request on `/users/register` where we will capture the data & save it into mongoDB database

4. Make sure to hash user's password before saving it into the database using pre('save') hook and bcrypt

##### Note:-

Use async version of bcrypt method to hash the password
