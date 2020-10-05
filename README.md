# Walkme Home Assignment - Frontend

## ‘Campaigns Caps Layer’ - enforces the campaign’s caps validations and filters campaigns before they are returned to the user.

Author: Tamir Mayblat, tamirmayb@gmail.com

## Content

###Prerequisites :

* Angular 9

###Notes :
* The app is using a mongodb cluster to save the data
* You can send a GET request to http://localhost:8080/walkme/api/campaigns in order to watch all the campaigns (the counters will not be effected).
* This app is designed to be used with java backend app: https://github.com/tamirmayb/walkme.git

###How to use :

* Start the backend server (see more details on the backend project). 
* ng init.
* ng start
* The app should now run on http://localhost:4200 
* You can create a campaign or update the counters for existing campaigns.
* Run a GET request to the following endpoint in order to see the campaigns for a user:
http://localhost:8080/walkme/api/campaigns/{userId}

** Example :  http://localhost:8080/walkme/api/campaigns/2

### Thanks
