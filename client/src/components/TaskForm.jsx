import { useState } from "react";

function TaskForm() {
  const [task, setTask] = useState("");
  // const [taskList, setTaskList] = useState([]);
  const [selectedDate,setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  })
  const [tasksByDate, setTasksByDate] = useState({})

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== "") {
      const newTask = { text: task, Done: false };
      const updatedTasks = [...getTasksForDate(selectedDate), newTask];

      setTasksByDate({ ...tasksByDate, [selectedDate]: updatedTasks });
      setTask("");
    }
  };

  const toggleDone = (index) => {
    const updatedTasks = [...getTasksForDate(selectedDate)];
    updatedTasks[index].Done = !updatedTasks[index].Done;
    setTasksByDate({ ...tasksByDate, [selectedDate]: updatedTasks });
  };


  const deleteTask = (index) => {
    const updatedTasks = getTasksForDate(selectedDate).filter(
      (_, i) => i !== index
    );
    setTasksByDate({ ...tasksByDate, [selectedDate]: updatedTasks });
  };

  const changeDate = (offset) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset);
    const newDate = date.toISOString().split("T")[0]; 
    setSelectedDate(newDate);
  };

  const getTasksForDate = (date) => {
    return tasksByDate[date] || []
  }

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
            <li key={index}>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-300">
                <span
                  className={`text-lg ${
                    t.Done ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {t.text}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleDone(index)}
                    className={`px-4 py-2 rounded-md text-white shadow ${
                      t.Done
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                  >
                    {t.Done ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
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
