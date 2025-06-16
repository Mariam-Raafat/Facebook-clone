import { Router } from 'express';
import PostsController from '../controllers/postsController';

const router = Router();
const postsController = new PostsController();

export default function setPostsRoutes(app: Router) {
    app.post('/posts', postsController.createPost.bind(postsController));
    app.get('/posts', postsController.getPosts.bind(postsController));
    app.get('/posts/:id', postsController.getPostById.bind(postsController));
    app.put('/posts/:id', postsController.updatePost.bind(postsController));
    app.delete('/posts/:id', postsController.deletePost.bind(postsController));
}