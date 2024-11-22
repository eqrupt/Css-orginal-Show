// 出涉及到的模型
// - PostDTO: { 
//     id: string;
//     title: string; 
//     content: string;
//     authorId: string;
//     createTime: Date;
//     updateTime: Date;
//     comments: CommentDTO[];
// }

// - CommentDTO: {
//     id: string;
//     content: string;
//     authorId: string; 
//     postId: string;
//     createTime: Date;
// }

// interface IPostService {
//   // 帖子相关操作
//   createPost(postDTO: PostDTO): Post;
//   getPostById(id: string): Post;
//   updatePost(postDTO: PostDTO): Post;
//   deletePost(id: string): boolean;
  
//   // 评论相关操作
//   addComment(commentDTO: CommentDTO): Comment;
//   deleteComment(commentId: string): boolean;
//   getCommentsByPostId(postId: string): Comment[];
// }



import { CommentDTO, PostDTO } from "@/types/PostandComentDTO";

interface IPostService {
  // 帖子相关操作
  createPost(postDTO: PostDTO): PostDTO;
  getPostById(id: string): PostDTO;
  updatePost(postDTO: PostDTO): PostDTO; 
  deletePost(id: string): boolean;
  getAllPosts(): PostDTO[];
}

class PostService implements IPostService {
  createPost(postDTO: PostDTO): PostDTO {
    const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
    postDTO.id = 'post_' + Math.random().toString(36).substr(2, 9);
    postDTO.createTime = new Date();
    postDTO.updateTime = new Date();
    postDTO.comments = [];
    posts.push(postDTO);
    localStorage.setItem('Posts', JSON.stringify(posts));
    return postDTO;
  }

  getPostById(id: string): PostDTO {
    const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
    const post = posts.find((p: PostDTO) => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  updatePost(postDTO: PostDTO): PostDTO {
    const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
    const index = posts.findIndex((p: PostDTO) => p.id === postDTO.id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    postDTO.updateTime = new Date();
    posts[index] = postDTO;
    localStorage.setItem('Posts', JSON.stringify(posts));
    return postDTO;
  }

  deletePost(id: string): boolean {
    const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
    const index = posts.findIndex((p: PostDTO) => p.id === id);
    if (index === -1) {
      throw new Error('Post not found');
    }
    posts.splice(index, 1);
    localStorage.setItem('Posts', JSON.stringify(posts));
    return true;
  }

  getAllPosts(): PostDTO[] {
    return JSON.parse(localStorage.getItem('Posts') || '[]');
  }
}

// 单例化代码
class PostServiceSingleton {
  private static instance: IPostService;

  private constructor() {}

  public static getInstance(): IPostService {
    if (!PostServiceSingleton.instance) {
      PostServiceSingleton.instance = new PostService();
    }
    return PostServiceSingleton.instance;
  }
}

const postService = PostServiceSingleton.getInstance();
