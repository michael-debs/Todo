import useLocalState from "@phntms/use-local-state";
import { useEffect, useState, createContext, useContext } from "react";

export const ListsContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ListsProvider({ children }) {
  const [localLists, setLocalLists] = useLocalState("lists", []);
  const [lists, setLists] = useState(localLists);
  const [currentList, setCurrentList] = useState(0);

  useEffect(() => {
    setLocalLists(lists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  async function addList(name) {
    try {
      await setLists((prevLists) => [...prevLists, { name: name, tasks: [] }]);
      setCurrentList((prev) => prev + 1);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function addTask(listIndex, taskName) {
    try {
      await setLists((prevLists) =>
        prevLists.map((list, index) => {
          if (index === listIndex) {
            list.tasks.push({ name: taskName, checked: false });
          }
          return list;
        })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function removeTask(listIndex, taskIndex) {
    setLists((prevLists) =>
      prevLists.map((list, index) => {
        if (index === listIndex) {
          let newTasks = list.tasks.filter(
            (task, tskIndex) => taskIndex !== tskIndex
          );
          return {
            ...list,
            tasks: newTasks,
          };
        }
        return list;
      })
    );
  }

  function removeList(listIndex) {
    setLists((prevLists) =>
      prevLists.filter((list, index) => listIndex !== index)
    );
    setCurrentList(-1);
  }

  function toggleTask(listIndex, taskIndex) {
    setLists((prevLists) =>
      prevLists.map((list, index) => {
        if (index === listIndex) {
          let tasks = list.tasks.map((task, index) => {
            if (index === taskIndex) {
              task.checked = !task.checked;
            }
            return task;
          });
          return { ...list, tasks };
        }
        return list;
      })
    );
  }

  function changeCurrentList(newIndex) {
    setCurrentList(newIndex);
  }
  return (
    <ListsContext.Provider
      value={{
        lists,
        currentList,
        changeCurrentList,
        addList,
        addTask,
        removeTask,
        toggleTask,
        removeList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  return useContext(ListsContext)
}
