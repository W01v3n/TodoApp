export default interface ITodoItem {
  id?: number;
  title: string;
  content?: string;
  completed?: boolean;
  listId: number;
  createdAt?: Date;
  updatedAt: Date;
}
