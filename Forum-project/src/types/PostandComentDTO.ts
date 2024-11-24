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
export interface PostDTO {
  id: string;
  title: string;
  content: Sstring;
  authorId: string;
  createTime: Date;
  updateTime: Date;
  comments: CommentDTO[];
}

export interface CommentDTO {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createTime: Date;
}