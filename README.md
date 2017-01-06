**Tweety**
===================
----------


Description
-------------

Tweety is a webapp which is designed following the problem statement of **"A Simple Web Application"** described below hosted by **"FireEye"**. Tweety is a web app which allows to add twitter users and displays the timeline of the selected user.

> **Problem Statement**

> -Create an UI application that displays the twitter timeline of at least two different users.
> - All content should be loaded dynamically.
> - Content can be loaded from static JSON files or it could use the real twitter API with an any type of backend.
> - In order to switch between the users it could be a link anywhere and using the url
> - You should be able to write a tweet where it says “ compose a tweet”  and add it to the top of the timeline.
> - No other actual functionality is needed.
> - You app should look similar to the twitter mockup
> - You can leverage open source ONLY for icons and fonts
> - You can leverage ANY JS framework of your choice
> - You can’t use any CSS frameworks/libraries but you can use less or sass
> -  Your code should have tests.
> - Deploy it to AWS/Heroku or any PaaS that you like
> - Push the code to public github/gitlab or bitbucket
> - Send us the link to code and deployed app.
Table of contents
-------------
1. Dependencies
2. Setup


###Dependencies

1. Nodejs
2.  Mongodb


##Setup

1. Install nodejs 
	* For mac and windows download the installer from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
	* For Linux run this command in terminal 
		

	        sudo apt-get install nodejs

2. Install mongodb.
3. Install and configure nginx server.
4. Install bower. Run this command in terminal
	

	    npm install -g bower

5.  Clone the repository.
6. Move inside the project root path i.e, **"tweety/"**
7.  Run this command in terminal 

	    npm install 

	This will install all the **node** and **bower** dependencies for the project.
8. Inside project root path edit the file **config.json** as
	

        {
    	"port":<port no>, 
    	"twitter": {
			"consumer_key": <twitter consumer key>,
			"consumer_secret": <twitter consumer secret>
		    },
    	"mongo": {
			"connUrl": <mongodb url>/<database name>,
			"collection": <mongodb collection name>
			}
    	}

       Default to get started:	

	    {
		"port": 9030,
		"twitter": {
			"consumer_key": TWITTER_CONSUMER_KEY,
			"consumer_secret": TWITTER_CONSUMER_SECRET
		},
		"mongo": {
			"connUrl": "mongodb://localhost:27017/tweety",
			"collection": "users"
			}
		}

9.  Inside **"treeview/public/"** edit the file app.js as

	    app.constant('baseUrl', <server url>);

	Default to get started:

	    app.constant('baseUrl', 'http://localhost:9030');

10. Make sure mongodb server is running.
11. Start the app server. Inside project root path **"tweety/"** run this command in terminal,

	    node index.js
12.  Visit url specified in baseUrl by default **http://localhost:9030** in browser.
		

