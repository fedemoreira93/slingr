import { Box, Modal } from "@mui/material";
import { Task, TaskEditorProps, TaskFormInputs } from "../Tasks.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_TASK_REQUEST, EDIT_TASK_REQUEST } from "@actionTypes/tasksTypes";
import TaskEditorHeader from "./TaskEditorHeader";
import TaskEditorFooter from "./TaskEditorFooter";
import TaskEditorContent from "./TaskEditorContent";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "560px",
  bgcolor: "background.paper",
  boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.25)",
};

const TaskEditor: React.FC<TaskEditorProps> = ({
  openModal,
  toggleShowPopup,
  task,
}) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm<TaskFormInputs>({
    defaultValues: {
      taskName: "",
      taskDescription: "",
      taskQuantity: 0,
      taskPurchased: false,
    },
  });

  useEffect(() => {
    reset({
      taskName: task?.name || "",
      taskDescription: task?.description || "",
      taskQuantity: task?.quantity || 0,
      taskPurchased: task?.purchased || false,
    });
  }, [task, reset]);

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    const newTask: Task = {
      id: 0,
      name: data.taskName,
      description: data.taskDescription,
      quantity: data.taskQuantity,
      purchased: data.taskPurchased,
    };
    dispatch({
      type: task?.id ? EDIT_TASK_REQUEST : ADD_TASK_REQUEST,
      payload: newTask,
    });
    toggleShowPopup(null);
    reset();
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        toggleShowPopup(null);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ minWidth: "300px" }}
    >
      <Box sx={modalStyle}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TaskEditorHeader title="SHOPPING LIST" />
            <TaskEditorContent task={task} control={control} />
            <TaskEditorFooter
              submitText={task ? `Save Item` : `Add task`}
              onCancel={() => {
                reset();
                toggleShowPopup(null);
              }}
            />
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskEditor;
