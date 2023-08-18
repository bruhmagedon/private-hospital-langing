import { Component } from "react";

class TextPanel extends Component {
    state = {
        status: "",
        term: "",
        text: "",
        id: -1,
    };

    //Первая отрисовка компонета - задаем дефолтный стейт
    componentDidMount = () => {
        this.onUpdateText(
            this.props.currentTaskInfo?.text,
            this.props.currentTaskInfo?.id
        );
    };

    //Меняем стейт при выборе другой задачи
    componentDidUpdate = () => {
        if (this.state.id != this.props.currentTaskInfo?.id) {
            this.onUpdateText(
                this.props.currentTaskInfo?.text,
                this.props.currentTaskInfo?.id
            );
        }
    };

    //Поиск задач
    onUpdateSearch = (e) => {
        const term = e.target.value; //связь формы со стейтом
        this.setState({ term });
        this.props.onUpdateSearch(term); //проброс стейта по иерархии выше, где он будет использоваться в фильтре
    };

    //Обновление состояние при перерендере или первой отрисовки компонента
    onUpdateText = (updateText, updateId) => {
        this.setState({
            text: updateText,
            id: updateId,
        });
    };

    //Изменение стейта через инпут (двойная связь)
    onEditTaskInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    //Получаем статус задачи
    onInteractTask = (e) => {
        this.setState({
            [e.target.name]: e.currentTarget.getAttribute("status"),
        });
    };

    //Отмена отправки формы по нажатию Enter
    onKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    render() {
        const { panelStatus, currentTaskInfo, onTaskSubmit, onAddTask } =
            this.props;

        const { text } = this.state;

        let addClassName, editClassName, deleteClassName;
        if (typeof currentTaskInfo === "undefined" && panelStatus) {
            addClassName = "task-text-button save-changes";
            editClassName = "edit-task-button dnone";
            deleteClassName = "edit-task-button delete dnone";
        } else {
            addClassName = "task-text-button save-changes dnone";
            editClassName = "edit-task-button";
            deleteClassName = "edit-task-button delete";
        }

        //Текстовая панель для редактирования и добавления
        if (panelStatus) {
            return (
                <form
                    className={"task-text-panel save-changes"}
                    onSubmit={(e) =>
                        onTaskSubmit(
                            e,
                            this.state.text,
                            this.state.id,
                            this.state.status
                        )
                    }
                >
                    <input
                        type="text"
                        className={"task-text-input save-changes"}
                        placeholder={"Введите задачу"}
                        name="text"
                        value={text || ""}
                        onChange={this.onEditTaskInput}
                        onKeyDown={this.onKey}
                    />
                    {/* Команда на добавление задачи */}
                    <button
                        className={addClassName}
                        type="submit"
                        name="status"
                        status="add"
                        onClick={this.onInteractTask}
                    >
                        +
                    </button>
                    <nav className="edit-container-buttons">
                        {/* Команда на редактирование задачи */}
                        <button
                            className={editClassName}
                            type="submit"
                            name="status"
                            status="edit"
                            onClick={this.onInteractTask}
                        >
                            Редактировать
                        </button>
                        {/* Команда на удаление задачи */}
                        <button
                            className={deleteClassName}
                            type="submit"
                            name="status"
                            status="delete"
                            onClick={this.onInteractTask}
                        >
                            Удалить
                        </button>
                    </nav>
                </form>
            );
        }
        // Текстовая панель для поиска
        return (
            <div className={"task-text-panel "}>
                <input
                    type="text"
                    className={"task-text-input "}
                    placeholder={"Найти задачу"}
                    onChange={this.onUpdateSearch}
                />
                <button className={"task-text-button"} onClick={onAddTask}>
                    +
                </button>
            </div>
        );
    }
}
export default TextPanel;
