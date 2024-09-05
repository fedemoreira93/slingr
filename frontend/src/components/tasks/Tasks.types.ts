export interface TasksProps {
  onClick: () => void;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  deleted: boolean;
}

export interface TaskEdit {
  id: number;
  name?: string;
  description?: string;
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
