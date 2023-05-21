# THYNKSO - TodoApp

## Overview
THYNKSO is an authenticated todo application, where each user has his own lists and his own items. Contributors are welcome, feel free to contribute.

## About
This app was created as a learning project. I just learned TypeScript, React, and the whole MERN (with SQL), and this is my beginner project, built from scratch entirely on my own.

![image](https://github.com/W01v3n/TodoApp/assets/69687310/49fb8369-fbcc-4db4-bfa4-b4a4e0f637b3)

## Features
- User authentication
- Users can create their own lists
- Users can add items to their lists

![image](https://github.com/W01v3n/TodoApp/assets/69687310/b441da56-6aaa-4e6e-b9a8-8d96b76192da)

![image](https://github.com/W01v3n/TodoApp/assets/69687310/e53a083e-d21e-4571-87cd-45e1cfcf910d)


## Getting Started
Here is how you can set up the project locally for development.

### Prerequisites
- Node.js
- npm
- A running MySQL / MariaDB server with access to root user
- An existing database and privileged user

### Installation

#### Create the database tables
```bash
mysql -u root -p
use <db_name>
CREATE TABLE `todo_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `list_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `list_id` (`list_id`),
  CONSTRAINT `todo_items_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `todo_lists` (`id`) ON DELETE CASCADE
  );
  
  CREATE TABLE `todo_lists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `todo_lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);
```

#### Clone the repository
```bash
git clone https://github.com/W01v3n/TodoApp.git
```
#### Adjust Ports
Make sure to edit the listen and access ports on the backend api at `app.ts` or your .`env` and the frontend `api.ts` according to your system.

#### Install
```bash
cd TodoApp/backend
npm install
cd TodoApp/frontend
npm install
```
#### .env file
```env
API_PORT='YOUR_PORT'
JWT_SECRET='YOUR_ACCESS_TOKEN_SECRET'
JWT_REFRESH_TOKEN_SECRET='YOUR_REFRESH_TOKEN_SECRET'
DB_HOST='YOUR_DB_HOST'
DB_NAME='YOUR_DB'
DB_USER='YOUR_DB_USER'
DB_PASSWORD='YOUR_DB_PASSWORD'
DB_CONNECTION_LIMIT='10
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
