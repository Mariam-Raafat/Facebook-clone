# Express Posts CRUD API

This project is a simple Express server that performs CRUD operations on posts using a JSON file as the backend database.

## Project Structure

```
express-posts-crud
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers
│   │   └── postsController.ts # Handles CRUD operations for posts
│   ├── models
│   │   └── postModel.ts      # Defines the Post interface
│   ├── routes
│   │   └── posts.ts          # Sets up routes for post operations
│   ├── types
│   │   └── post.ts           # Type definitions for posts
│   └── data
│       └── posts.json        # Mock database for storing posts
├── package.json               # NPM configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd express-posts-crud
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

- `POST /posts` - Create a new post
- `GET /posts` - Retrieve all posts
- `GET /posts/:id` - Retrieve a post by ID
- `PUT /posts/:id` - Update a post by ID
- `DELETE /posts/:id` - Delete a post by ID

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.