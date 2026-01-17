pipeline {
    agent any

    environment {
        BASE_URL = credentials('app-login-url')
        IMAGE_NAME = 'nileshrahinj0211/pw-ui-automation-testing01:latest'
    }

    stages {

        stage('Pull Docker Image') {
            steps {
                bat 'docker pull %IMAGE_NAME%'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'app-login-creds',
                        usernameVariable: 'APP_USERNAME',
                        passwordVariable: 'APP_PASSWORD'
                    )
                ]) {
                    bat '''
                    docker run --rm ^
                      -e BASE_URL=%BASE_URL% ^
                      -e APP_USERNAME=%APP_USERNAME% ^
                      -e APP_PASSWORD=%APP_PASSWORD% ^
                      %IMAGE_NAME%
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished"
        }
    }
}
