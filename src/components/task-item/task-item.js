const TaskItem = ({ id, text, isChecked, onChooseTask, onCheckTask }) => {
    const itemTaskIcons = "item-icon " + (isChecked ? "unchecked" : ""); //статус задачи
    return (
        <li className="item" value={id}>
            <span
                className={itemTaskIcons}
                onClick={(e) =>
                    onCheckTask(id, e.currentTarget.getAttribute("data-toggle"))
                }
                data-toggle="isChecked"
            ></span>
            {/* Изменить / удалить можно только если задача в процессе */}
            <p
                className="item-text"
                onClick={isChecked ? onChooseTask : null}
                id={id}
            >
                {text}
            </p>
        </li>
    );
};
export default TaskItem;
