pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/harsh-hy/cakes-n-shapes.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t bakery-frontend .'
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                script {
                    sh 'docker stop bakery-frontend-container || true'
                    sh 'docker rm bakery-frontend-container || true'
                }
            }
        }
        
        stage('Run New Container') {
            steps {
                sh 'docker run -d --name bakery-frontend-container -p 3000:80 bakery-frontend'
            }
        }
    }
}
