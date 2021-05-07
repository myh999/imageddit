# Imageddit

[![Node.js CI](https://github.com/myh999/imageddit/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/myh999/imageddit/actions/workflows/node.js.yml)

An image repository where users can upload images and post comments

## Features
- User authentication
- Uploading images
- Searching images by title
- Adding comments to images

## Requirements
- Node.JS
- MySQL

## Instructions

1. Clone the repository
```bash
$ git clone https://github.com/myh999/imageddit.git
$ cd imageddit
```

2. Create a new database in your MySQL server and run the `server/create_tables.sql` script to create tables

3. Go to the `client` folder and install dependencies
```bash
$ cd client
$ npm install
```

4. Rename `.envexample` to `.env` and fill in the appropriate fields. Ensure that there is a valid user that has SELECT/UPDATE/INSERT permissions in your MySQL database.

5. Start the server.
```bash
$ npm run start
```

Further instructions to use the application can be found in the `docs` directory

## Testing
This project uses Jest as the test framework.  
To test:
```bash
$ npm run test
```
