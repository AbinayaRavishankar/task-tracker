import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://task-tracker-a5fa.onrender.com";

function TaskForm() {
  const [task, setTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [tasksByDate, setTasksByDate] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/task`, {
          params: { date: selectedDate },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasksByDate((prev) => ({
          ...prev,
          [selectedDate]: response.data.tasks,
        }));
      } catch (error) {
        console.error(
          "Failed to fetch tasks:",
          error.response?.data || error.message
        );
      }
    };

    fetchTasks();
  }, [selectedDate]);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const getTasksForDate = (date) => tasksByDate[date] || [];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task.trim() === "") return;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/task`,
        { title: task, date: selectedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdTask = response.data.task;
      const updatedTasks = [...getTasksForDate(selectedDate), createdTask];

      setTasksByDate({ ...tasksByDate, [selectedDate]: updatedTasks });
      setTask("");
    } catch (error) {
      console.error(
        "Task creation Failed!",
        error.response?.data || error.message
      );
    }
  };

  const toggleDone = async (index, taskId) => {
    const currentStatus = getTasksForDate(selectedDate)[index].completed;

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/task/${taskId}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTasks = [...getTasksForDate(selectedDate)];
      updatedTasks[index].completed = response.data.task.completed;

      setTasksByDate({ ...tasksByDate, [selectedDate]: updatedTasks });
    } catch (error) {
      console.error(
        "Failed to update task:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTask = async (index, taskId) => {
    try {
      await axios.delete(`${BASE_URL}/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedTasks = getTasksForDate(selectedDate).filter(
        (_, i) => i !== index
      );
      setTasksByDate({ ...tasksByDate, [selectedDate]: updatedTasks });
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error.response?.data || error.message
      );
    }
  };

  const changeDate = (offset) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset);
    const newDate = date.toISOString().split("T")[0];
    setSelectedDate(newDate);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
      >
        <input
          type="text"
          name="task"
          className="flex-grow px-4 py-3 border-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="What do you wanna do?"
          value={task}
          onChange={handleTaskChange}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-md shadow"
        >
          Add Task
        </button>
      </form>

      <div>
        <h2 className="text-blue-700 font-bold text-3xl mb-6 text-center">
          Task List
        </h2>
        <div className="flex justify-end items-center gap-4 p-4">
          <button
            onClick={() => changeDate(-1)}
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            ←
          </button>
          <span className="font-bold text-lg">{selectedDate}</span>
          <button
            onClick={() => changeDate(1)}
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            →
          </button>
        </div>

        <ul className="space-y-4">
          {getTasksForDate(selectedDate).map((t, index) => (
            <li key={t._id}>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-300">
                <span
                  className={`text-lg ${
                    t.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {t.title}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleDone(index, t._id)}
                    className={`px-4 py-2 rounded-md text-white shadow ${
                      t.completed
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                  >
                    {t.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => deleteTask(index, t._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskForm;
