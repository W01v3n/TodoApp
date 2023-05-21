# THYNKSO - TodoApp

## Overview
THYNKSO is an authenticated todo application where each user has his own lists and his own items. The application was built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and SQL for database management.
It is very important to mention that this app was not built throughout an online course, it was built entirely from scratch.
As a beginner project, it was constructed from scratch to apply the knowledge gained from learning TypeScript, React, and the MERN stack. Contributions are always welcome and appreciated!

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
You'll need to edit the listen and access ports on the backend API at `app.ts` or your .env file and the frontend api.ts file according to your system. For example, if you want the backend to listen on port 5000, you would adjust the `API_PORT` variable in your .env file like so: `API_PORT='5000'`.

#### Install dependencies
Navigate to the backend directory with `cd TodoApp/backend` and run `npm install`. Repeat this process for the frontend with `cd TodoApp/frontend` and `npm install`.
```bash
cd TodoApp/backend
npm install
cd TodoApp/frontend
npm install
```
#### Create a .env file
Create a .env file in the root of the backend directory. This file should contain the following environment variables:
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

#### Build the project
```bash
cd TodoApp/backend
npm run build
cd TodoApp/frontend
npm run build
```

#### Run the backend
```bash
cd TodoApp/backend
npm run start
```

#### Deploy the frontend
Grab the `dist` directory created from the npm build process on the frontend, and deploy it as a DocumentRoot for a web server.


## Contact
Feel free to reach out to me at sabadiatal@gmail.com if you have any questions or issues.

## Contributing
Your contributions are welcome. Feel free to make a pull request or raise an issue.

## License
This project is licensed under the MIT License.

## Acknowledgments
Tal Sabadia - Full stack developer. Building web applications from scratch.
