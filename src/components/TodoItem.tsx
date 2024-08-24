import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
type Props = {
  isProcessed: boolean;
  onDelete?: () => {};
  onUpdate: () => void;
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo, isProcessed, onUpdate }) => {
  const [redacting] = useState(false);
  const [newTitle] = useState(todo.title);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>
      {!redacting ? (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      ) : (
        <form onSubmit={() => onUpdate}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
          />
        </form>
      )}
      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isProcessed })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
