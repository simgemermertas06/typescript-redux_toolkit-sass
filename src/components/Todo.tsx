import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import "../styles/TodoShow.scss";
import { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import { removeTodoById, updateTodo } from "../redux/todoSlice";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface TodoProps {
  todoProps: TodoType;
}

function Todo({ todoProps }: TodoProps) {
  const { id, content } = todoProps;

  const dispatch = useDispatch();

  const [editable, setEditable] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);

  // BİLDİRİMLER
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false); // Silme onayı için state
  const [openUpdateConfirm, setOpenUpdateConfirm] = useState<boolean>(false); // Güncelleme onayı için
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // Snackbar'ı kontrol eden state
  const [snackbarMessage, setSnackbarMessage] = useState<string>(""); // Snackbar mesajı
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  ); // Snackbar tipi

  const handleRemoveTodo = () => {
    setOpenDeleteConfirm(false);
    setSnackbarMessage("Silme işlemi başarılı");
    setSnackbarType("success");
    setSnackbarOpen(true);

    // Todo'yu biraz geç siliyoruz.Yani bileşen yok olmadan önce Snackbar gösterilir.Yoksa snackbar görünmüyor
    setTimeout(() => {
      dispatch(removeTodoById(id));
    }, 3000);
  };

  // Güncelleme
  const handleUpdateTodo = () => {
    const payload = {
      id: id,
      content: newTodo,
    };
    dispatch(updateTodo(payload)); // Todo'yu güncelle
    setEditable(false);
    setSnackbarMessage("Güncelleme işlemi başarılı"); // Mesajı güncelle
    setSnackbarType("success"); // Mesaj tipini başarılı yap
    setSnackbarOpen(true); // Snackbar'ı aç
  };

  // Snackbar kapanma işlemi
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="todo-show">
      {/* Düzenleme modunda input göster */}
      {editable ? (
        <input
          type="text"
          className="todo-input"
          placeholder="Düzenleme yapın"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
        />
      ) : (
        <div className="content">{content}</div>
      )}

      <div className="icons">
        {/* Silme ikonuna tıklayınca onay mesajını aç */}
        <AiOutlineDelete
          className="delete-icon"
          onClick={() => setOpenDeleteConfirm(true)} // Silme onayı penceresini aç
        />

        {/* Güncelleme ikonuna tıklayınca düzenleme modunu aç */}
        {editable ? (
          <FaCheck className="check-icon" onClick={handleUpdateTodo} />
        ) : (
          <CiEdit
            onClick={() => setEditable(!editable)}
            className="update-icon"
          />
        )}
      </div>

      {/* Silme onayı mesajı */}
      {openDeleteConfirm && (
        <div className="confirmation-modal">
          <p>Silmek istiyor musunuz?</p>
          <div>
            <button className="update-button" onClick={handleRemoveTodo}>
              Evet
            </button>
            <button
              className="update-button"
              onClick={() => setOpenDeleteConfirm(false)}
            >
              Hayır
            </button>
          </div>
        </div>
      )}

      {/* Güncelleme onayı mesajı */}
      {openUpdateConfirm && (
        <div className="confirmation-modal">
          <p>Güncellemek istiyor musunuz?</p>
          <button onClick={handleUpdateTodo}>Evet</button>
          <button onClick={() => setOpenUpdateConfirm(false)}>Hayır</button>
        </div>
      )}

      {/* Snackbar (başarı mesajları için) */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Todo;
