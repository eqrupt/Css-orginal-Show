// 输出涉及到的模型
// - CommentDTO: {
//     id: string;
//     content: string;
//     authorId: string;
//     postId: string;
//     createTime: Date;
// }
// - PostDTO: { 
//     id: string;
//     title: string; 
//     content: string;
//     authorId: string;
//     createTime: Date;
//     updateTime: Date;
//     comments: CommentDTO[];
// }

import { CommentDTO, PostDTO } from "@/types/PostandComentDTO";

interface ICommentService {
    // 评论相关操作
    addCommentToPost(postId: string, commentDTO: CommentDTO): CommentDTO;
    updateCommentInPost(postId: string, commentDTO: CommentDTO): CommentDTO;
    deleteCommentFromPost(postId: string, commentId: string): boolean;
    getCommentsByPostId(postId: string): CommentDTO[];
  }
  
  class CommentService implements ICommentService {
    addCommentToPost(postId: string, commentDTO: CommentDTO): CommentDTO {
      const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
      const post = posts.find((p: PostDTO) => p.id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
      commentDTO.id = 'comment_' + Math.random().toString(36).substr(2, 9);
      post.comments.push(commentDTO);
      localStorage.setItem('Posts', JSON.stringify(posts));
      return commentDTO;
    }

    updateCommentInPost(postId: string, commentDTO: CommentDTO): CommentDTO {
      const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
      const post = posts.find((p: PostDTO) => p.id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
      const commentIndex = post.comments.findIndex((c: CommentDTO) => c.id === commentDTO.id);
      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }
      post.comments[commentIndex] = commentDTO;
      localStorage.setItem('Posts', JSON.stringify(posts));
      return commentDTO;
    }

    deleteCommentFromPost(postId: string, commentId: string): boolean {
      const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
      const post = posts.find((p: PostDTO) => p.id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
      const commentIndex = post.comments.findIndex((c: CommentDTO) => c.id === commentId);
      if (commentIndex === -1) {
        throw new Error('Comment not found');
      }
      post.comments.splice(commentIndex, 1);
      localStorage.setItem('Posts', JSON.stringify(posts));
      return true;
    }

    getCommentsByPostId(postId: string): CommentDTO[] {
      const posts = JSON.parse(localStorage.getItem('Posts') || '[]');
      const post = posts.find((p: PostDTO) => p.id === postId);
      if (!post) {
        throw new Error('Post not found');
      }
      return post.comments;
    }
  }
//单例化代码
  class CommentServiceSingleton {
    private static instance: ICommentService;

    private constructor() {}

    public static getInstance(): ICommentService {
      if (!CommentServiceSingleton.instance) {
        CommentServiceSingleton.instance = new CommentService();
      }
      return CommentServiceSingleton.instance;
    }
  }

  const commentService = CommentServiceSingleton.getInstance();