
import axios from 'axios';

// URL API
const api = axios.create({
  baseURL: 'https://localhost:7275/api', 
});

// LOGIN
export const loginUser = (username: string, password: string) =>
  api.post('/Usuarios/login', { username, password });

// NOVO USUARIO
export const registerUser = (username: string, password: string) =>
  api.post('/Usuarios/register', { username, password });

// BUSCAR TAREFAS E LISTAR TODAS
export const fetchTasks = () => api.get('/Tarefas');

// BUSCAR TAREFAS E LISTAR POR USUARIO
export const fetchTasksByUser = (userId: string) => 
    api.get(`/Tarefas/usuario/${userId}`); // Lista tarefas por usuário

// CRIAR TAREFAS
export const createTask = (task: any) => api.post('/Tarefas', task);

// ATUALIZAR TAREFA
export const updateTask = (id: string, task: any) => api.put(`/Tarefas/${id}`, task);


// DELETAR TAREFA
export const deleteTask = (id: string) => api.delete(`/Tarefas/${id}`);

export default api;
