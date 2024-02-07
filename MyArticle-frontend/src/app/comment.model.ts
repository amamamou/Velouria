export interface Comment {
  comment_id: number;
  article_id: number;
  user_id: number;
  comment_text: string;
  created_at: Date;
  updated_at: Date;
  username: string;
}
