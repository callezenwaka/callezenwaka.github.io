// define blog interface
export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  avatar: string;
  tags: string[];
  status: boolean,
  link: string;
  created_at: number;
  updated_at: number;
}

export default Blog;