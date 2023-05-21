# THYNKSO - TodoApp

## Overview
THYNKSO is an authenticated todo application, where each user has his own lists and his own items. The complete app and fancy styling is on its way. Contributors are welcome, feel free to contribute.

## About
This app was created as a learning project. I just learned TypeScript, React, and the whole MERN (with SQL), and this is my beginner project, built from scratch entirely on my own.

![image](https://github.com/W01v3n/TodoApp/assets/69687310/96760896-339a-4abd-8565-288277aae3f6)

## Features
- User authentication
- Users can create their own lists
- Users can add items to their lists

![image](https://github.com/W01v3n/TodoApp/assets/69687310/825a76b9-11d6-4738-9a7b-801a56c811f5)

![image](https://github.com/W01v3n/TodoApp/assets/69687310/78f61d0b-5d6a-48c8-96d8-9d7d8e54da57)


## Getting Started
Here is how you can set up the project locally for development.

### Prerequisites
- Node.js
- npm

### Installation
#### Clone the repository
```bash
git clone https://github.com/W01v3n/TodoApp.git
```
#### Adjust Ports
Make sure to edit the listen and access ports on the backend api and the frontend `api.ts` according to your system.

#### Install
```bash
cd TodoApp/backend
npm install
cd TodoApp/frontend
npm install
```
#### Build
```bash
cd TodoApp/backend
npm run build
cd TodoApp/frontend
npm run build
```

#### Run Backend
```bash
cd TodoApp/backend
npm run start
```

#### Deploy frontend
Grab the `dist` directory created from the npm build process on the frontend, and deploy it as a DocumentRoot for a web server.
