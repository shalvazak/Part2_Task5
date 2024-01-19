import React, { Component } from 'react';

class TaskItem extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.task !== nextProps.task;
    }
  
    render() {
        console.log('Render TaskItem');

        const { task, onComplete, onDelete } = this.props;
        
        return (
            <li>
                {task}
                <button onClick={onDelete}><i className="fa fa-trash"></i></button>
                {onComplete && <button onClick={onComplete}><i className="fa fa-check"></i></button>}
            </li>
        );
    }
}

export default TaskItem;