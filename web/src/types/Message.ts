export interface Message {
  id: number;
  text: string;
  user?: {
    name: string
    email: string
  };
  createdAt: string;
}
