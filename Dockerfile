FROM docker-caboodle.sharedservices.obps.io:80/opplatform/static-webapp:0.1.102

ARG CABOODLE_ARG=unknown
LABEL CABOODLE-VERSION=$CABOODLE_ARG

COPY build /opt/rh/httpd24/root/var/www/html/
