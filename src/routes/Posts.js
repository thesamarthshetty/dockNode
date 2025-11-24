import Express from 'express'
import { getAllPost, createPost, getSinglePost } from '../controllers/Posts.js'
import { extraJwt } from './Common.js';

const PostRouter = new Express.Router()

PostRouter.use(extraJwt)

PostRouter.get('/', getAllPost);
PostRouter.post('/create', createPost);
PostRouter.get('/:id', getSinglePost);

export { PostRouter }