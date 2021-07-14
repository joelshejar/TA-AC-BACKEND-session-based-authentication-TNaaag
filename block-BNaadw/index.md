writeCode

Create a blog app with article resources. Each article can have one or multiple comments on them.

Article resource should contain fields:

- title
- description
- likes
- commemnts []
- author
- slug

Slug is basically concatinated version of title seperated by `-` or `_`. Slugs are used in place of ids to display article details route.

Article details routes are generally `/articles/uwye734687363466344` i.e. some random id. We can replace it with slug to beautify the url that is `/articles/intro-to-nodejs`

For example:-

Title -> "Intro to Nodejs"
slug -> "intro-to-nodejs"

While inserting the article data into database:

- define a pre save to generate slug from title and save it to database
- ensure that each slug generated should be unique in entire articles collection.
- optionally, you can use `slug` or `slugger` npm module to generate slug.

Implement user registration and login on top of the blog application.

Registration form should input fields like

- firstName
- lastName
- email[unique]
- password
- city

Define a method on userSchema to generate `fullName` of the user using `firstName` and `lastName`

Ensure that:

- a user can only view/create/edit/update blog once he logged in.
- a non-logged in user trying to perform above opreation should be redirected to login/registration page
- a logged in user can like/dislike an article.
- a logged in user can create/edit/delete a comment on any article.
