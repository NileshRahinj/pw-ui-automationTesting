pipeline {
    agent any

    environment {
        BASE_URL = credentials('app-login-url')  // Secret text
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NileshRahinj/pw-ui-automationTesting'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'app-login-creds', 
                                                 usernameVariable: 'APP_USERNAME', 
                                                 passwordVariable: 'APP_PASSWORD')]) {
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            // Only works if HTML Publisher Plugin is installed
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
