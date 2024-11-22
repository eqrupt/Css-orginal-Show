
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
// interface ICommentService {
//     // 评论相关操作
//     addCommentToPost(postId: string, commentDTO: CommentDTO): CommentDTO;
//     updateCommentInPost(postId: string, commentDTO: CommentDTO): CommentDTO;
//     deleteCommentFromPost(postId: string, commentId: string): boolean;
//     getCommentsByPostId(postId: string): CommentDTO[];
//   }
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

import { defineStore } from 'pinia';
import { CommentDTO, PostDTO } from '@/types/PostandComentDTO';
import { ref } from 'vue';
import { generateRandomPosts } from '../api/PostTools';

export const usePostStore = defineStore('post', () => {
  const posts = ref<PostDTO[]>([]);
  const currentPost = ref<PostDTO | null>(null);

  // 帖子相关操作
  const createPost = (postDTO: PostDTO) => {
    const newPost = {
      ...postDTO,
      id: 'post_' + Math.random().toString(36).substr(2, 9),
      createTime: new Date(),
      updateTime: new Date(),
      comments: []
    };
    posts.value.push(newPost);
    localStorage.setItem('Posts', JSON.stringify(posts.value));
    return newPost;
  };

  const getPostById = (id: string) => {
    const post = posts.value.find(p => p.id === id);
    if (!post) throw new Error('帖子未找到');
    currentPost.value = post;
    return post;
  };

  const updatePost = (postDTO: PostDTO) => {
    const index = posts.value.findIndex(p => p.id === postDTO.id);
    if (index === -1) throw new Error('帖子未找到');
    const updatedPost = {
      ...postDTO,
      updateTime: new Date()
    };
    posts.value[index] = updatedPost;
    localStorage.setItem('Posts', JSON.stringify(posts.value));
    return updatedPost;
  };

  const deletePost = (id: string) => {
    const index = posts.value.findIndex(p => p.id === id);
    if (index === -1) throw new Error('帖子未找到');
    posts.value.splice(index, 1);
    localStorage.setItem('Posts', JSON.stringify(posts.value));
    return true;
  };

  const getAllPosts = () => {
    const storedPosts = JSON.parse(localStorage.getItem('Posts') || '[]');
    if (storedPosts.length === 0) {
      // 如果没有帖子,生成5个随机帖子
      const randomPosts = generateRandomPosts(5);
      posts.value = randomPosts;
    } else {
      posts.value = storedPosts;
    }
    console.log(posts.value);
    return posts.value;
  };

  // 评论相关操作
  const addCommentToPost = (postId: string, commentDTO: CommentDTO) => {
    const post = posts.value.find(p => p.id === postId);
    if (!post) throw new Error('帖子未找到');
    
    const newComment = {
      ...commentDTO,
      id: 'comment_' + Math.random().toString(36).substr(2, 9),
      createTime: new Date()
    };
    
    post.comments.push(newComment);
    localStorage.setItem('Posts', JSON.stringify(posts.value));
    return newComment;
  };

  const updateCommentInPost = (postId: string, commentDTO: CommentDTO) => {
    const post = posts.value.find(p => p.id === postId);
    if (!post) throw new Error('帖子未找到');

    const commentIndex = post.comments.findIndex(c => c.id === commentDTO.id);
    if (commentIndex === -1) throw new Error('评论未找到');

    post.comments[commentIndex] = commentDTO;
    localStorage.setItem('Posts', JSON.stringify(posts.value));
    return commentDTO;
  };

  const deleteCommentFromPost = (postId: string, commentId: string) => {
    const post = posts.value.find(p => p.id === postId);
    if (!post) throw new Error('帖子未找到');

    const commentIndex = post.comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) throw new Error('评论未找到');

    post.comments.splice(commentIndex, 1);
    localStorage.setItem('Posts', JSON.stringify(posts.value));
    return true;
  };

  const getCommentsByPostId = (postId: string) => {
    const post = posts.value.find(p => p.id === postId);
    if (!post) throw new Error('帖子未找到');
    return post.comments;
  };

  return {
    posts,
    currentPost,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getAllPosts,
    addCommentToPost,
    updateCommentInPost,
    deleteCommentFromPost,
    getCommentsByPostId
  };
});
