# React.js: Connecting to REST API

Description: Finally! Now, you are about to put a final touches on all pages you created - implement interaction with your REST API server.

Variants -  (products that you are ‘selling’) the same as for previous works. (see the description to 3rd work)

Backend - just as discussed before, can be the one you used for your 3-5 work or a new one created from scratch. Tech stack - absolutely up to you. 

Requirements: 
●	All of the requirements for previous React.js works should be kept.
●	Code style: 
○	For any http request - use axios library
https://github.com/axios/axios#installing
○	All your API functions should be separated into single file (or folder, if you want) - just like you saw in Live coding for 5 lab with fetch() function
●	Functionality: 
○	On Catalog Page - all items should now be fetched from your backend with GET method (using axios)
○	Search with filters - should also be implemented with GET request (search by text field can be left as it is)
Hint: pass filters as url parameter
○	Before response from your GET method is received you have to display a Spinner(Loader component) to the user. Something like this: https://projects.lukehaas.me/css-loaders/
