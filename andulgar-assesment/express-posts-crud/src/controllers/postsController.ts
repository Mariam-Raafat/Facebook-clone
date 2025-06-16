class PostsController {
    private posts: any;

    constructor() {
        this.posts = require('../data/posts.json');
    }

    createPost(req: any, res: any) {
        const newPost = req.body;
        newPost.id = this.posts.length + 1;
        this.posts.push(newPost);
        this.savePosts();
        res.status(201).json(newPost);
    }

    getPosts(req: any, res: any) {
        res.status(200).json(this.posts);
    }

    getPostById(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const post = this.posts.find((p: any) => p.id === postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }

    updatePost(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const index = this.posts.findIndex((p: any) => p.id === postId);
        if (index !== -1) {
            const updatedPost = { ...this.posts[index], ...req.body };
            this.posts[index] = updatedPost;
            this.savePosts();
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }

    deletePost(req: any, res: any) {
        const postId = parseInt(req.params.id);
        const index = this.posts.findIndex((p: any) => p.id === postId);
        if (index !== -1) {
            this.posts.splice(index, 1);
            this.savePosts();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }

    private savePosts() {
        const fs = require('fs');
        fs.writeFileSync('./src/data/posts.json', JSON.stringify(this.posts, null, 2));
    }
}

export default PostsController;