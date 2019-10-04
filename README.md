# Secure messages web app

## Purpose
The repository is for Secure Message Web App.
This application is web version of Secure Message Functionality from RIB application.

### functionality
* abilty to list, read, compose, send, delete secure messages
* abilty to list, view, filter documents
* abilty to navigate to preferences from documents 

## Dependants

### Ib Servicing (b-web)
It is hosted on IHS server and embedded within b-web(iB Servicing web app) as an iframe.

### CB, YB, B Apps
It is embedded within the mobile apps as a webview for the secure messages and document portal feature

### MEO
It is embedded in MEO as a "widget" (react component) via `meo-widgets-webapp`

## Integrating

Example url:

```
{baseURL}/securemessages/{brand}#access_token={access_token}&bank_id{bankId}&client_context={app_title}&user_tracking_id={user_tracking_id}&brandId={brand}&state={state}&isDocumentLibraryEnabled=true
```

### MEO

The MEO is imported for Advisor as below:

```javascript
import { AdvisorApp as App } from "secure-messages-webapp";

<AdvisorApp comfig={meoConfig} />
```

## Deployment - Jenkins jobs

### B web

To deploy secure messages to be used in B web you need to do the following
* Build the web app in http://jenkins-dev.eu.nag.net/V2/job/Web-Apps/job/WebApp%20Build%20and%20Package%20to%20Nexus/
* Find the version in the console output - should be near the bottom of the file in a format such as 2.0.2-b456
* Run the deploy job http://jenkins-dev.eu.nag.net/V2/job/Web-Apps/job/Deploy%20secure-messaging%20v1.0/ using the version number you noted in the last step. It is good to practice to go on CYBG teams to inform INT3 Deployments that you are deploying secure messages.

### MEO

For secure messages to be used in MEO you need to deploy it as library to nexus - do so using the following link

* Go to http://10.207.209.30/V2/job/NPM%20Builds/job/NPM%20Build%20Module%20v1.1/build?delay=0sec and build the package to be used in nexus. Note, you will need to have bumped the version in package.json or the job will fall over, as it will try to update an existing nexus package version.
* Go into meo-widget-webapp repository (this can be found in Github). Update the secure messaging version in there. Should be /application/src/int/secure-messaging/package.json within that solution.
* Verify that package can be installed using npm install
* Follow the process in README for meo-widget-webapp for creating PR, merging and then deploying change using goCD.

## Local testing

In order to test locally you can use the document-management-web-ui library stubs. This will provide stub responses for both secure messages and documents.

* Change config.env.json file to point to the following 2 Urls

```javascript
{
    "apiBaseUrl": "http://localhost:8888/ibapi/v2",
    "apiBaseUrl2": "http://localhost:8888/ibapi/v2"
}

```

* Navigate to document management web ui solution and run command 

    npm run start:stub_server

* Start secure messages application using

    npm run start

#### MEO 

The app can be ran as an advisor to simulate the MEO environment. 
This includes using session data from logging into the agent platform and getting staff access tokens.
You can run this app as an advisor by running:

    npm run start:advisor
    
**IMPORTANT**: this requires that you have Google Chrome installed (currently supports MacOS installs).
All current instances of Google Chrome must be **stopped** so the advisor app can launch with specific configurations.

After launching Chrome, the app will ask you for your ALP Username / Password

    ?What is your ALP username?: <R/S Number>
    ?What is your ALP password?: <8 digit ALP password>
    
This information will fetch your staff access token and run advisor webpack, loading html with your staff configuration.
