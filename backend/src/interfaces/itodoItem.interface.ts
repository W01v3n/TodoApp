export default interface ITodoItem {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  listId: number;
  createdAt: Date;
  updatedAt: Date;
}
