import React, { useState, useEffect } from 'react';
import api from '../services/api';

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

type TaskFormProps = {
  onSave: (task: Task) => void;
  editingTask: Task | null;
};

const TaskForm = ({ onSave, editingTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCategory(editingTask.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await api.put(`/Tarefas/${editingTask.id}`, {
          title,
          description,
          category,
          isCompleted: editingTask.isCompleted,
        });
        onSave(response.data);
      } else {
        const response = await api.post('/Tarefas', {
          title,
          description,
          category,
          isCompleted: false,
        });
        onSave(response.data);
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoria"
        required
      />
      <button type="submit">{editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}</button>
    </form>
  );
};

export default TaskForm;
