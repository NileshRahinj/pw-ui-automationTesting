pipeline {
    agent any

    environment {
        BASE_URL = credentials('app-login-url')  // URL secret text is OK here
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NileshRahinj/pw-ui-automationTesting'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                // Inject username/password only for this stage
                withCredentials([usernamePassword(credentialsId: 'app-login-creds', 
                                                 usernameVariable: 'APP_USERNAME', 
                                                 passwordVariable: 'APP_PASSWORD')]) {
                    sh 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
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
