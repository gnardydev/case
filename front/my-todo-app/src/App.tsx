// src/App.tsx
import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className="App">
      <h1>Gerenciador de Tarefas</h1>
      <TaskList />
    </div>
  );
};

export default App;
