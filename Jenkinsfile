node {
  checkout scm
}
pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'echo ${GIT_BRANCH}'
        sh 'echo ${NODE_ENV}'
        sh 'npm ci'
      }
    }
    stage('Lint Source') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Test Source') {
      steps {
        sh 'npm run test:source'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
        script {
          env.NAME = sh(script: "cat ./dist/NAME.txt", returnStdout: true)
          env.VERSION = sh(script: "cat ./dist/VERSION.txt", returnStdout: true)
          env.MD5SUM = sh(script: "cat ./dist/MD5SUM.txt", returnStdout: true)
          env.SHA1SUM = sh(script: "cat ./dist/SHA1SUM.txt", returnStdout: true)
          env.SHA256SUM = sh(script: "cat ./dist/SHA256SUM.txt", returnStdout: true)
          env.SHA512SUM = sh(script: "cat ./dist/SHA512SUM.txt", returnStdout: true)
        }
        sh 'echo name=${NAME}'
        sh 'echo version=${VERSION}'
        sh 'echo md5sum=${MD5SUM}'
        sh 'echo sha1sum=${SHA1SUM}'
        sh 'echo sha256sum=${SHA256SUM}'
        sh 'echo sha512sum=${SHA512SUM}'
        sh 'rm -rf ./dist/*.txt'
        archiveArtifacts artifacts: "dist/**/*", fingerprint: true
      }
    }
    stage('Test Built Module') {
      steps {
        sh 'npm run test:module'
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo Deployment'
      }
    }
    stage('Cleanup') {
      steps {
        sh 'npm run clean'
        sh 'rm -rf node_modules/'
      }
    }
  }
}