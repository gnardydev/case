// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TaskForm from './TaskForm';

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/Tarefas');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/Tarefas/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleSave = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleEdit(task)}>Editar</button>
          <button onClick={() => handleDelete(task.id)}>Deletar</button>
        </div>
      ))}
      <TaskForm onSave={handleSave} editingTask={editingTask} />
    </div>
  );
};

export default TaskList;
 