# Contributing

## Getting started

_Note: You must be on the vpn in order to install `web-ui-components` and `document-management-web-ui`_

clone the Repository and follow the steps:
1. `npm install`
2. `npm run start` - For Dev Setup
3. `npm run release` - For PROD package


## MEO dev mode

To start in MEO devmode, run: 

```
npm run start:advisor
```

## Pull Requests

Features should be merged into develop branch. Before deploying develop should be merged to master.

## Stubs

You can use the stub server present in `document-managment-web-ui` to run this application against canned responses. 

## Deploying

To deploy changes to secure messages into INT do the following: 

- merge develop -> master
- run [Build and Package to Nexus](http://jenkins-dev.eu.nag.net/V2/job/Web-Apps/job/WebApp%20Build%20and%20Package%20to%20Nexus/)
- run [Deploy Secure Messaging](http://jenkins-dev.eu.nag.net/V2/job/Web-Apps/job/Deploy%20secure-messaging%20v1.0/)
- update the [Deployment Tracker](https://abouthere.atlassian.net/wiki/spaces/BOW/pages/234023204/Web+Application+Deployment+Dates+and+Build+Versions)


NOTE: there is an unadrressed caching issue which means you may need to clear cache to see changes

### Rollback

To rollback a secure messages build simply deploy the previously deployed build using [Deploy Secure Messaging](http://jenkins-dev.eu.nag.net/V2/job/Web-Apps/job/Deploy%20secure-messaging%20v1.0/)