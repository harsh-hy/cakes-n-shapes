pipeline {
     agent any
 
     stages {
         stage('Clone Repository') {
             steps {
                 git url: 'https://github.com/harsh-hy/cicd', branch: 'main'
             }
         }
 
         stage('Build Docker Image') {
             steps {
                 sh 'docker build -t bakery-frontend .'
             }
         }
 
         stage('Run Docker Container') {
             steps {
                 sh '''
                 docker stop bakery-frontend-container || true
                 docker rm bakery-frontend-container || true
                 docker run -d --name bakery-frontend-container -p 8080:80 bakery-frontend
                 '''
             }
         }
     }
 }
