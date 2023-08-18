import { Component } from "react";
import TextPanel from "../text-panel/text-panel";
import TaskItem from "../task-item/task-item";
import EditPanel from "../edit-panel/edit-panel";
import "./app.scss";

//Лучше было бы сделать приложение на хуках, но я только начал их изучать, поэтому сделал на классах
class App extends Component {
    state = {
        //Допустим приходит какой то get запрос с некоторыми данными и мы парсим их в данный массив, а затем отправляем в state
        data: [
            {
                id: 0,
                isChecked: true,
                text: "Сделать таск-лист",
            },
            {
                id: 1,
                isChecked: true,
                text: "Выложить в гитхаб",
            },
        ],
        currentTaskId: -1,
        maxId: 1,
        term: "",
    };

    //Выбрать задачу для редактирования (по кастомному атрибуту)
    onChooseTask = (e) => {
        this.setState({
            currentTaskId: +e.currentTarget.getAttribute("id"),
        });
    };

    //Закрыть панель редактирования
    onClosePanel = () => {
        this.setState({
            currentTaskId: -1,
        });
    };

    //Обновление строки поиска
    onUpdateSearch = (term) => {
        this.setState({ term });
    };

    //Выдача результата на основе поиска
    searchEmp = (tasks, term) => {
        if (term.length === 0) {
            return tasks;
        }
        return tasks.filter((task) => {
            return task.text.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    //Достать стейт компонента ниже, на него основе отредактировать текущий стейт
    onChangeTask = (e, text, id, status) => {
        switch (status) {
            case "add":
                const newTask = {
                    id: id,
                    isChecked: true,
                    text: text,
                };

                this.setState(({ data }) => {
                    const tempData = [...data, newTask];
                    return {
                        data: tempData,
                        maxId: id,
                        currentTaskId: -1,
                    };
                });
                return;
            case "edit":
                this.setState(({ data }) => {
                    //Нужно скопировать стейт и внести изменения в копии
                    const tempData = data.map((task) => {
                        if (task.id === id) {
                            task.text = text;
                            return task;
                        }
                        return task;
                    });
                    return {
                        data: tempData,
                        currentTaskId: -1,
                        //Затем вернуть копию чтобы не произошла мутация setState
                    };
                });
                return;
            case "delete":
                this.setState(({ data }) => {
                    return {
                        data: data.filter((task) => task.id !== id),
                        currentTaskId: -1,
                    };
                });
            default:
                return;
        }
    };

    //Изменение стейта при добавление задачи
    onAddTask = () => {
        this.setState({ currentTaskId: this.state.maxId + 1 });
    };

    //Изменение статуса задачи
    onCheckTask = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    //C помощью кастомного атрибута, находящегося в prop, можно создать новый объект массива data
                    return { ...item, [prop]: !item[prop] };
                }
                return item;
            }),
        }));
    };

    render() {
        const { data, currentTaskId, term } = this.state;
        const visibleData = this.searchEmp(data, term);

        //Cписок задач через mapы
        const tasks = visibleData.map((task) => {
            const { id, ...taskProps } = task;
            return (
                <TaskItem
                    key={id}
                    id={id}
                    {...taskProps}
                    onChooseTask={this.onChooseTask}
                    onCheckTask={this.onCheckTask}
                />
            );
        });

        const currentTaskInfo = data.filter(
            (task) => task.id === currentTaskId
        );

        return (
            <div className="app-container">
                <div className="task-container">
                    <TextPanel
                        status={false}
                        onUpdateSearch={this.onUpdateSearch}
                        onAddTask={this.onAddTask}
                    />
                    <ul className="task-list-container">{tasks}</ul>
                </div>
                <EditPanel
                    onCloseEditPanel={this.onClosePanel}
                    currentTaskId={currentTaskId}
                    currentTaskInfo={currentTaskInfo}
                    onChangeTask={this.onChangeTask}
                />
            </div>
        );
    }
}

export default App;
