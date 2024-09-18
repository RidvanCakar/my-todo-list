import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');

    useEffect(() => {
        // Flask API'den görevleri çekme
        axios.get('http://localhost:5000/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = () => {
        const newTask = { name: taskName, completed: false };
        axios.post('http://localhost:5000/tasks', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                setTaskName('');
            })
            .catch(error => console.error('Error adding task:', error));
    };

    return (
        <div>
            <h1>Yapılacaklar Listesi</h1>
            <input
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                placeholder="Yeni görev..."
            />
            <button onClick={addTask}>Ekle</button>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
