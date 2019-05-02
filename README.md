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

The MEO is imported for Advisor as below:

```javascript
import { AdvisorApp as App } from "secure-messages-webapp";

<AdvisorApp comfig={meoConfig} />
```

