export interface TasksProps {
  tasks: Task[];
  toggleShowPopup: (task: Task | null) => void;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
}

export interface TaskEdit {
  id: number;
  name?: string;
  description?: string;
  quantity?: number;
  purchased: boolean;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface TaskEditorProps {
  openModal: boolean;
  toggleShowPopup: (task: Task | null) => void;
  task: Task | null;
}

export interface TaskFormInputs {
  taskName: string;
  taskDescription: string;
  taskQuantity: number;
  taskPurchased: boolean;
}

export interface TaskQuantityOption {
  label: string;
  quantity: number;
}
