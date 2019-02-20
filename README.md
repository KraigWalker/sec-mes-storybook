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

```javascript
import { AdvisorApp as App } from "secure-messages-webapp";

<AdvisorApp comfig={meoConfig} />
```

