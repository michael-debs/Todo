import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useLists } from "../contexts/ListsProvider";

export default function Nav() {
  const { lists, changeCurrentList, currentList } = useLists();

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        style: {
          width: "200px",
          padding: "20px",
        },
      }}
    >
      <Typography variant="h6">My Lists</Typography>
      <Divider sx={{ my: 3 }} />
      <List>
        {lists.map((list, index) => (
          <ListItemButton
            key={index}
            selected={currentList === index}
            onClick={() => changeCurrentList(index)}
            sx={{ mb: 1 }}
          >
            <ListItemText primary={list.name} />
          </ListItemButton>
        ))}

        <AddListButton />
      </List>
    </Drawer>
  );
}

function AddListButton() {
  const { addList } = useLists();
  const [toggleInput, setToggleInput] = useState(true);
  const [name, setName] = useState();

  if (toggleInput) {
    return (
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        onClick={() => setToggleInput((prev) => !prev)}
      >
        Add List
      </Button>
    );
  } else {
    return (
      <div>
        <TextField
          variant="outlined"
          label="List Name"
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
              const res = await addList(name);
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
