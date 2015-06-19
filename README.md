# How to run the app
 Install Mongo globally and run the mongo server, check MongoFac repo by Lukars to do so.
 In termnal, inside your repo type: export SECRET=yourmandrilltoken .This is required for the emailing stuff
 To run the app just clone the repo: https://github.com/lajj/picup and run npm install. When all of the dependencies have been installed type nodemon server.js or just node server.js if you don't have nodemon installed. When you have the server running open a browser and type in localhost:8000 and press enter. You will then be taken to the landing.html page. Once authenticated, you will be able to upload images by title and add comments to go along with the uploaded images.

## Dependencies


[![Code Climate](https://codeclimate.com/github/lajj/picup/badges/gpa.svg)](https://codeclimate.com/github/lajj/picup)

[![Test Coverage](https://codeclimate.com/github/lajj/picup/badges/coverage.svg)](https://codeclimate.com/github/lajj/picup/coverage)

[![devDependency Status](https://david-dm.org/lajj/picup/dev-status.svg)](https://david-dm.org/lajj/picup#info=devDependencies)

[![Build Status](https://travis-ci.org/lajj/picup/.svg?branch=master)](https://travis-ci.org/lajj/picup)

# Introduction
The project goal in week 6 was to create a stripped down version of instagram. On completion of the project the app will incorporate the following features:  

 + Password controlled user accounts
 + Upload files to Mongo DB
 + Users able to define access to photos
 + Tracking user statistics

 As a stretch goal we set ourselves the task of deploying the app to Heroku.

 #Pivotal Tracker
 As part of our workflow for this project we incorporated Pivotal tracker and created user stories for the app. You can see all of our user stories using this  [link](https://www.pivotaltracker.com/n/projects/1368336). Make sure you are logged into the F&C pivotal tracker account.

 ##Technologies used
 To create this app we have used JavaScript for the whole stack, so this means that JavaScript is the only language we used both on the front and back end of the app even the database. The technologies used are:

 ### Front End
 + HTML/CSS
 + JavaScript
 + jQuery

 ###Back End
 + NodeJS
 + Hapi
 + MongoDb

 #### Retreive images
 Once you have uploaded images you can search your profile for images that match a search term. You can search for the uploaded images on index.html page. To retrieve the images just type in 'title' in the first box that says 'key' and type in the title of the previous image that you uploaded. You can also search by time, so this means that you can display all of the images that were uploaded in the last hour up until the last 24 hours.  

## Breakdown of the different files

### server.js
This is the basic server.js file that contains the initializing of the hapi framework and starting the server.

### mongo.js
This file contains the methods for creating, reading and deleting from the database, along with the details for for making a connection to the database.

### routes.js
This is where all of the handling is done. These endpoints links to the handlers.js file where all the work is done. The first endpoint handles any requests made on the root and just serves out the upload.html page for any requests. The /upload endpoint is where all of the images are sent when they are submitted from the client side. The /signup is the endpoint that serves out the pages for the signup page. Once signed up the users can sign in via the /usersignin endpoint and users are authenticated. We have several enpoints that handle the search feature when the user is searching for an image. In a nutshell we retrieve the images from the database using the unique IDs that they are assigned upon creation. Finally, we have an endpoint that

### handlers.js
This file handles the file requests coming from the routes.

### analytics.js
This file handles the analytics functions on the site.

### hasher.js
This is where all of the encryption of the user password is done and where the comparison is made when the user enters their password to login.

# Tests
We have some tests in the test branch, they are working from console logs, but we're trying to get them to work with logic...