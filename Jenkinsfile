pipeline {
    agent {
        docker {
            image 'nileshrahinj0211/pw-ui-automation-testing01:latest'
            args '-u root' // optional if permissions required
        }
    }

    environment {
        BASE_URL = credentials('app-login-url')  // Secret text
    }

    stages {
        stage('Run Tests') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'app-login-creds', 
                                                 usernameVariable: 'APP_USERNAME', 
                                                 passwordVariable: 'APP_PASSWORD')]) {
                    sh 'npx playwright test'
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']],
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }
    }
}
