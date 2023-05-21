# THYNKSO - TodoApp

## Overview
THYNKSO is an authenticated todo application, where each user has his own lists and his own items. The complete app and fancy styling is on its way. Contributors are welcome, feel free to contribute.

## About
This app was created as a learning project. I just learned TypeScript, React, and the whole MERN (with SQL), and this is my beginner project, built from scratch entirely on my own.

## Features
- User authentication
- Users can create their own lists
- Users can add items to their lists


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
