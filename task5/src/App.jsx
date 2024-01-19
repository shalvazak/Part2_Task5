import './App.css';

import React, { Component } from 'react';
import TaskItem from './components/taskitem';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      completedTasks: [],
      newTask: '',
    };
  }
  
  handleChange = (event) => {
    this.setState({ newTask: event.target.value });
  };
  
  addTask = () => {
    if (this.state.newTask.trim() === '') {
      return;
    }
    
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, this.state.newTask],
      newTask: '',
    }));
  };
  
  completeTask = (index) => {
    const completedTask = this.state.tasks[index];
    
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((_, i) => i !== index),
      completedTasks: [...prevState.completedTasks, completedTask],
    }));
  };
  
  deleteTask = (index, isCompletedTask) => {
    if (isCompletedTask) {
      this.setState((prevState) => ({
        completedTasks: prevState.completedTasks.filter((_, i) => i !== index)
      }));
    } else {
      this.setState((prevState) => ({
        tasks: prevState.tasks.filter((_, i) => i !== index)
      }));
    }
  };


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.tasks !== nextState.tasks ||
      this.state.completedTasks !== nextState.completedTasks ||
      this.state.newTask !== nextState.newTask
    );
  }
  
  render() {
    console.log("render log", this.state)

    return (
      <div className="container">
        <div className="addTask">
          <input type="text" value={this.state.newTask} onChange={this.handleChange} />
          <button onClick={this.addTask}>Add</button>
        </div>

        <ol className="notCompleted">
          <h3>Tasks to be Performed</h3>
          {this.state.tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onComplete={() => this.completeTask(index)}
              onDelete={() => this.deleteTask(index, false)}
            />
          ))}
        </ol>

        <ol className="Completed">
          <h3>Completed Works</h3>
          <ul>
            {this.state.completedTasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onDelete={() => this.deleteTask(index, true)}
              />
            ))}
          </ul>
        </ol>
        
      </div>
    );
  }
}

export default TodoApp;
