pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Akila-19/mini_proj.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("cicd-image")
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove old container if it exists
                    sh '''
                    if [ $(docker ps -q --filter "name=cicd-container") ]; then
                        docker stop cicd-container
                        docker rm cicd-container
                    fi
                    '''
                    // Run the new container with a fixed name and port mapping
                    sh 'docker run -d -p 3000:3000 --name cicd-container cicd-image'
                }
            }
        }
    }
}
