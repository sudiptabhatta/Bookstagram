


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sudiptabhatta/Bookstagram.git">
    <img src="client/public/stylesheet/images/bgm.png" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">Bookstagram</h3>

  <p align="center">
    BOOKS, PHOTOGRAPHY, AND AESTHETICS!
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#authentication">Authentication</a></li>
        <li><a href="#profile-view">Profile View</a></li>
        <li><a href="#upload-book">Upload Book</a></li>
        <li><a href="#book-tag">Book Tag</a></li>
        <li><a href="#post-details">Post Details</a></li>
        <li><a href="#user-search">User Search</a></li>
        <li><a href="#book-rating">Book Rating</a></li>
        <li><a href="#follow-unfollow-users">Follow/Unfollow Users</a></li>
      </ul>
    </li>
    <li><a href="#demo">Demo</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



Bookstagram focuses not only on book reviews but also on photography. The web app itself is solely dedicated to books. While simple in features and without any fancy details, this app will focus on the comfort of the users. I wanted to create a platform for aesthetically composed photos of books, and I took inspiration from the existing popular social media sites. To have a stylish, stable and responsive front-end, I used React Bootstrap and Tailwind CSS. I used Django Rest Framework for a stable backend. It contains features such as JWT Authentication for seamless and secure user logins. As the web application is mainly focused on book photography, I took inspiration from Instagram and each post had to contain photos of books. I implemented a feature of book tag using Google books API. This feature allows the user to search and find books while creating posts. If any user wants to share the name of the specific book they are photographing, this option allows them to tag that book within the post. The user can see top three suggestions based on the keywords they search within the box and then can select the specific book they need.


### Built With

Bookstagram will be able to run on any javascript enabled browser. The powerful design framework React Bootstrap and Tailwind CSS will allow the webapp to run on all kinds of devices that have any basic browser. 
There are some requirements to develop and deploy the product. Development environment was set up locally, so no cloud services was used during this period.

* [React](https://react.dev/) - for frontend of this web application 
* [React Bootstrap](https://react-bootstrap.netlify.app/) -Design of the templates
* [Django Rest Framework](https://nodejs.org/en/](https://www.django-rest-framework.org/))- Backend framework of the web application
* [SQLite](https://www.mysql.com/](https://www.sqlite.org/)) Database of the webapp
* [Tailwind CSS](https://ejs.co/](https://tailwindcss.com/))  - for the UI design



## Features

###   Authentication
To use our web application, users need to be authenticated first. To complete the signup process, users have to provide their credentials: username, full name, email address, and password and confirm password. The system can check if the email address and username are already in use. After successfully signing up, the app will redirect to the login page. Signed-up users can access all our functionalities by logging into the system. Users can log in to the app by entering an email and password. We implemented authentication processing leveraging the JWT (Json Web Token) protocol. Upon logging in, the user is provided with an access token and a refresh token. The access token expires after 10 mins but the refresh token which has a longer expiry time is used to retrieve a new access token. 

###  Profile View
Once logged in, users are redirected to their profile page, where they can view their username, email, and personal posts made on the platform. Additionally, users can see their list of followers and followings, as well as visit other users' profiles. A default blank picture will be displayed as profile picture initially. However, they can update or delete their profile picture if they want. 

###   Upload Book
To upload an image, users also need to select a photo of a book. Providing a caption and description is optional. They can also tag a book if they want.

###   Book Tag
To tag a book, we have used the React to process the requests relevant to the Google Books API. So, users have to enter a book name to tag a book, and then the system will show top suggestions from google books. Users can pick any book from the list of suggestions based on the Author and Published Date. This is all about book tags. Actually, it works like if they want to tag a book, then only they can pick from the suggestion list. If there are no book details available that they want to tag when uploading a book photo, she can't tag that book using Google Books API.

###   Post Details
Users can view the post details in the home page. If the user is the owner of this post, they can edit or delete the post. After clicking this edit button, the system will redirect to the book edit page. From here they can change the caption, description, and the photo. The user can view comments and post comments also. 

###   User Search
Users can also search for any user. If the user exists, their profile will display here. By clicking this link, the system will redirect to the profile. 

###   Book Rating 
Users can rate the books they've uploaded to their profiles, with a rating scale ranging from 1 to 5 stars. However, they are not permitted to rate books uploaded by other users. Instead, they can engage with others' books by leaving comments.

###   Follow Unfollow Users
Users can follow or unfollow each other at any time. To view another user's book posts, following that user is required.


## Demo
Youtube Link: https://youtu.be/VdSeszGtmS8 (Recommended to watch in 1.5x speed.)
