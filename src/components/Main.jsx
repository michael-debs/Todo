import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useLists } from "../contexts/ListsProvider";

export default function Main() {
  const { lists, currentList, toggleTask, removeList, removeTask } = useLists();

  const handleToggle = (itemIndex) => () => {
    toggleTask(currentList, itemIndex);
  };

  if (!lists[currentList]) {
    return;
  }

  return (
    <main
      style={{
        paddingLeft: "260px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          gap: "20px",
        }}
      >
        <Typography variant="h5" component="h1">
          {lists[currentList].name}
        </Typography>
        <IconButton onClick={() => removeList(currentList)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <List
        dense
        sx={{
          width: "100%",
          maxWidth: 360,
          border: "1px solid lightGray",
          borderRadius: "2px",
          p: 4,
        }}
      >
        {lists[currentList].tasks.map((task, index) => {
          return (
            <ListItem key={index}>
              {task.checked ? (
                <ListItemText
                  sx={{
                    textDecoration: "line-through",
                    fontStyle: "italic",
                  }}
                  primary={task.name}
                />
              ) : (
                <ListItemText primary={task.name} />
              )}
              <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={task.checked}
              />
              <IconButton onClick={() => removeTask(currentList, index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
        <AddItemButton listIndex={currentList} />
      </List>
    </main>
  );
}

// eslint-disable-next-line react/prop-types
function AddItemButton({ listIndex }) {
  const { addTask } = useLists();
  const [toggleInput, setToggleInput] = useState(true);
  const [name, setName] = useState();

  if (toggleInput) {
    return (
      <Button
        sx={{ width: "100%", mt: 6 }}
        variant="contained"
        onClick={() => setToggleInput((prev) => !prev)}
      >
        Add Task
      </Button>
    );
  } else {
    return (
      <div>
        <TextField
          sx={{
            width: "100%",
          }}
          variant="outlined"
          label="Task Name"
          onChange={(e) => setName(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px",
            gap: "4px",
          }}
        >
          <IconButton
            onClick={() => {
              setName("");
              setToggleInput((prev) => !prev);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={async () => {
              const res = await addTask(listIndex, name);
              if (res) {
                setName("");
                setToggleInput((prev) => !prev);
              }
            }}
          >
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}
