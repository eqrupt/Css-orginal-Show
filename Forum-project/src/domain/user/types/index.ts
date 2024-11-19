export interface UserDTO {
    username: string
    password: string
  }
  
export interface User {
    id: string
    username: string
    createdAt: Date
  }


export interface LoginDTO {
    username: string
    password: string
  }
  
export interface LoginResponse {
    user: User
    token: string
  }