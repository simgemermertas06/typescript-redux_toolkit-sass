import { useDispatch } from "react-redux";
import "../styles/TodoCreate.scss";
import { useState } from "react";
import { createTodo } from "../redux/todoSlice";
import { TodoType } from "../types/Types";

// MUI Snackbar ve Alert import
import { Snackbar, Alert } from "@mui/material";

function TodoCreate() {
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState<string>("");

  // Snackbar kontrolü ve tipi için iki adet state ekliyoruz
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleCreateTodo = () => {
    if (newTodo.trim().length === 0) {
      //  Hatalı giriş durumunda hata mesajı göster
      setSnackbarMessage("Lütfen bir ekleme yapınız.");
      setSnackbarType("error");
      setSnackbarOpen(true);
      return;
    }

    const payload: TodoType = {
      id: Math.floor(Math.random() * 999999999999),
      content: newTodo,
    };

    dispatch(createTodo(payload));
    setNewTodo("");

    // Başarılı ekleme bildirimi
    setSnackbarMessage("Ekleme işlemi başarılı");
    setSnackbarType("success");
    setSnackbarOpen(true);
  };

  // Snackbar'ı kapatma fonksiyonu
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <div className="todo-create">
      <h3>TYPESCRIPT - SASS - REDUX TOOLKIT</h3>

      <input
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        className="todo-input"
        type="text"
        placeholder="Ekleme Yapınız..."
      />

      <button onClick={handleCreateTodo} className="todo-create-button">
        Ekle
      </button>

      {/* Snackbar bileşeninde hem başarılı hem de hatalı durumlar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TodoCreate;
