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
                    dockerImage.run("-d -p 3000:3000")
                }
            }
        }
    }
}
