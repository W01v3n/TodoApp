# THYNKSO - TodoApp

## Overview
THYNKSO is an authenticated todo application, where each user has his own lists and his own items. The complete app and fancy styling is on its way. Contributors are welcome, feel free to contribute.

## About
This app was created as a learning project. I just learned TypeScript, React, and the whole MERN (with SQL), and this is my beginner project, built from scratch entirely on my own.

![image](https://github.com/W01v3n/TodoApp/assets/69687310/cfb6c30a-18ec-4205-8d3e-6ef0d8211230)

## Features
- User authentication
- Users can create their own lists
- Users can add items to their lists

![image](https://github.com/W01v3n/TodoApp/assets/69687310/f6a9d9d2-98ba-4d02-b4aa-1045b796f9f7)

![image](https://github.com/W01v3n/TodoApp/assets/69687310/ffba5120-3cf3-45fb-ba46-34b47581665a)


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
