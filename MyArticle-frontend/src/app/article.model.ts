export interface Article {
  id?: string; // '?' makes the id optional
  title: string;
  content: string;
  author: string;
  image: string ;
  category_id: number;
  isLiked?: boolean; // Keep the type as boolean
  comments?: any[]; // Add comments property
  likes?: any[];    // Add likes property

}
