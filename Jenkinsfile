// pipeline {
//     agent any
//     stages {
//         stage('Clone') {
//             steps {
//                 git 'https://github.com/Akila-19/mini_proj.git'
//             }
//         }
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     dockerImage = docker.build("cicd-image")
//                 }
//             }
//         }
//         stage('Deploy') {
//             steps {
//                 script {
//                     // Stop and remove old container if it exists
//                     sh '''
//                     if [ $(docker ps -q --filter "name=cicd-container") ]; then
//                         docker stop cicd-container
//                         docker rm cicd-container
//                     fi
//                     '''
//                     // Run the new container with a fixed name and port mapping
//                     sh 'docker run -d -p 3000:3000 --name cicd-container cicd-image'
//                 }
//             }
//         }
//     }
// }

// with k8s deployment
pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Akila-19/mini_proj.git'
            }
        }
        stage('Stop & Remove Previous Docker Containers') {
            steps {
                script {
                    sh 'docker ps --filter "ancestor=myapp-image" -q | xargs -r docker stop'
                    sh 'docker ps -a --filter "ancestor=myapp-image" -q | xargs -r docker rm'
                }
            }
        }
        stage('Build Docker Image for Minikube') {
            steps {
                script {
                    sh 'eval $(minikube docker-env) && docker build -t myapp-image .'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                    sh 'kubectl rollout restart deployment/myapp-deployment'
                    sh 'kubectl rollout status deployment/myapp-deployment'
                }
            }
        }
    }
}