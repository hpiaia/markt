export interface Room {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  owner: {
    name: string;
    email: string;
  };
}
