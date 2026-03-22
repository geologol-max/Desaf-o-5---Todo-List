/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle2, Circle, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export default function App() {
  // Requirement 6: Initial tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1711123456789, description: 'Hacer mercado', completed: true },
    { id: 1711123456790, description: 'Estudiar para la prueba', completed: false },
    { id: 1711123456791, description: 'Sacar a pasear a Tobby', completed: false },
  ]);

  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Requirement 3 & 5: Counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  // Requirement 1: Add task
  const addTask = () => {
    if (newTaskDescription.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now(),
      description: newTaskDescription,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskDescription('');
  };

  // Requirement 2: Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Requirement 4: Toggle completed
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <ClipboardList className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Todo List</h1>
            <p className="text-zinc-400 text-sm">Gestiona tus tareas diarias con precisión</p>
          </div>
        </header>

        {/* Input Section */}
        <section className="mb-12 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 shadow-2xl shadow-black/50">
          <label htmlFor="new-task" className="block text-sm font-medium text-zinc-400 mb-2 ml-1">
            Nueva tarea
          </label>
          <div className="flex gap-3">
            <input
              id="new-task"
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Ej. Comprar pan..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-zinc-500"
            />
            <button
              onClick={addTask}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Summary Sidebar - Requirement 3 & 5 */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
              <div className="mb-6">
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Total</p>
                <p className="text-4xl font-mono text-white">{totalTasks}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Realizadas</p>
                <p className="text-4xl font-mono text-emerald-400">{completedTasks}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
              <div className="flex justify-between text-xs mb-2 text-zinc-400 font-bold uppercase tracking-tighter">
                <span>Progreso</span>
                <span>{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>
          </aside>

          {/* Tasks List - Requirement 6 */}
          <main className="lg:col-span-9">
            <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden">
              <div className="grid grid-cols-[80px_1fr_100px] gap-4 p-4 border-bottom border-zinc-800 bg-zinc-800/30 text-xs font-bold uppercase tracking-widest text-zinc-500">
                <div className="pl-2">ID</div>
                <div>Tarea</div>
                <div className="text-center">Acciones</div>
              </div>

              <div className="divide-y divide-zinc-800/50">
                <AnimatePresence mode="popLayout">
                  {tasks.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-12 text-center text-zinc-500 italic"
                    >
                      No hay tareas pendientes. ¡Buen trabajo!
                    </motion.div>
                  ) : (
                    tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`grid grid-cols-[80px_1fr_100px] gap-4 p-4 items-center hover:bg-zinc-800/20 transition-colors group`}
                      >
                        <div className="text-[10px] font-mono text-zinc-600 pl-2">
                          {task.id.toString().slice(-4)}
                        </div>
                        
                        <div className={`text-sm transition-all duration-300 ${task.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                          {task.description}
                        </div>

                        <div className="flex items-center justify-center gap-3">
                          {/* Requirement 4: Checkbox/Toggle */}
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`p-1.5 rounded-lg transition-all ${
                              task.completed 
                                ? 'bg-emerald-500/20 text-emerald-400' 
                                : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
                            }`}
                            title={task.completed ? "Desmarcar" : "Completar"}
                          >
                            {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                          </button>

                          {/* Requirement 2: Delete */}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:bg-red-500/20 hover:text-red-400 transition-all"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>

        {/* Footer / Info */}
        <footer className="mt-12 pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs font-mono">
            &copy; 2026 Todo List Pro &bull; Desafío Latam Unit 5
          </p>
        </footer>
      </div>
    </div>
  );
}
