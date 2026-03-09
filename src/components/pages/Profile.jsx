import React, { useState } from 'react';
import { BookMarked, CheckCircle2, Circle, ListTodo, Presentation, Play } from 'lucide-react';
import './Profile.css';

const formulaData = {
    'Signals & Systems': [
        { title: 'Fourier Transform', formula: 'X(jω) = ∫ x(t) e^(-jωt) dt' },
        { title: 'Convolution', formula: 'y(t) = x(t) * h(t) = ∫ x(τ)h(t-τ) dτ' },
        { title: 'Energy of Signal', formula: 'E = ∫ |x(t)|^2 dt' }
    ],
    'Microprocessors': [
        { title: 'Clock Frequency', formula: 'f = 1 / T' },
        { title: 'Memory Capacity', formula: 'Capacity = 2^n × m bits' },
        { title: 'Baud Rate', formula: 'Baud = (Clock Freq) / (32 × Divider)' }
    ],
    'Thermodynamics': [
        { title: 'Ideal Gas Law', formula: 'PV = nRT' },
        { title: 'First Law', formula: 'ΔU = Q - W' },
        { title: 'Efficiency of Heat Engine', formula: 'η = W / QH = 1 - (QC / QH)' }
    ]
};

const Profile = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Review Mathematics Assignment', completed: false },
        { id: 2, text: 'Download EC401 previous papers', completed: true },
        { id: 3, text: 'Upload Digital Logic lab manual', completed: false }
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [activeTopic, setActiveTopic] = useState('Signals & Systems');

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
    };

    return (
        <div className="profile-container py-8">
            <div className="container">

                <div className="dashboard-header mb-8">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="text-muted">Welcome back! Manage your tasks and quick references.</p>
                    </div>
                </div>

                <div className="dashboard-grid">

                    {/* To-Do List Widget */}
                    <div className="widget-card card">
                        <div className="widget-header">
                            <ListTodo className="widget-icon text-primary" />
                            <h2>Task Tracker</h2>
                        </div>

                        <form onSubmit={addTodo} className="todo-form">
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>

                        <ul className="todo-list">
                            {todos.map(todo => (
                                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                    <button onClick={() => toggleTodo(todo.id)} className="btn-toggle">
                                        {todo.completed ?
                                            <CheckCircle2 className="text-success" size={20} /> :
                                            <Circle className="text-muted" size={20} />
                                        }
                                    </button>
                                    <span className="todo-text">{todo.text}</span>
                                </li>
                            ))}
                            {todos.length === 0 && <p className="text-center text-muted m-4">No tasks yet.</p>}
                        </ul>
                    </div>

                    {/* Formula Sheet Viewer */}
                    <div className="widget-card card">
                        <div className="widget-header">
                            <BookMarked className="widget-icon text-primary" />
                            <h2>Formula Sheet Viewer</h2>
                        </div>

                        <div className="formula-topics">
                            {Object.keys(formulaData).map(topic => (
                                <button
                                    key={topic}
                                    className={`topic-btn ${activeTopic === topic ? 'active' : ''}`}
                                    onClick={() => setActiveTopic(topic)}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>

                        <div className="formula-display bg-light">
                            <h3 className="formula-topic-title">{activeTopic} Equations</h3>
                            <div className="equation-list">
                                {formulaData[activeTopic].map((item, idx) => (
                                    <div key={idx} className="equation-item">
                                        <span className="eq-title">{item.title}</span>
                                        <div className="eq-box">
                                            <code>{item.formula}</code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
