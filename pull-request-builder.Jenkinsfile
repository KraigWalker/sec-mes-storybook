// This config file is heavily bias towards Cypress, as it's been taken from api-connector-lib
// for this reason, some sections have been commented out.
// Todo: Replace Jest unit tests with Cypress Unit/Integration tests

pipeline {
    agent { label 'nodejs12' }
    options {
        timestamps ()
        timeout(time: 10, unit: 'MINUTES')
    }
    environment {
        HUSKY_SKIP_INSTALL = 1
        CYPRESS_CACHE_FOLDER = "/opt/Cypress_SecureMessagesWebapp"
        CYPRESS_INSTALL_BINARY = "http://nexus-caboodle.sharedservices.obps.io/repository/thirdparty-binaries/cypress/desktop/${getCypressVersion()}/linux-x64/cypress.zip"
    }
    stages {
        stage('Install') {
            steps {
                sh encoding: 'UTF-8', script: '''
                npm ci
                '''
            }
        }
        stage('Unit Tests') {
            steps {
                sh encoding: 'UTF-8', script: '''
                npm run test:ci
                '''
            }
        }
        stage('Build') {
            steps {
                sh encoding: 'UTF-8', script: '''
                npm run build
                '''
            }
        }
       // stage('Integration Tests') {
       //     steps {
       //         sh encoding: 'UTF-8', script: '''
       //        npm run test:stubs
       //        '''
       //     }
       // }
    }
   // post {
   //    always {
   //         // Publish JUnit Results
   //         junit allowEmptyResults: false, testResults: '*junit.xml,**/cypress/results/*.junit.xml'
   //     }
   // }
}

def getCypressVersion() {
    def packagejson = readJSON file: 'package.json'
    return packagejson.devDependencies.cypress
}