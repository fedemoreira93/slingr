export interface TasksProps {
  onClick: () => void;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  quantity?: number;
  deleted: boolean;
}

export interface TaskEdit {
  id: number;
  name?: string;
  description?: string;
  quantity?: number;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface TaskEditorProps {
  openModal: boolean;
  handleClose: () => void;
  task?: Task;
}

export interface TaskFormInputs {
  taskName: string;
  taskDescription: string;
  taskQuantity: number | null;
}

export interface TaskQuantityOption {
  label: string;
  quantity: number;
}
