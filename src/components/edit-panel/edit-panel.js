import { Component } from "react";
import TextPanel from "../text-panel/text-panel";

class EditPanel extends Component {
    //Буферный метод между компонентами для передачи состояния
    //e - объект события, text - текст выбранной задачи,
    //id - её идентификатор, status - что с задачей нужно сделать
    onTaskSubmit = (e, text, id, status) => {
        e.preventDefault(); //чтобы страница не перезагружалась
        if (
            (typeof text === "undefined" || text.trimLeft() === "") &&
            status != "delete"
        ) {
            alert("Введите текст в поле");
            return;
        }
        //Передаём новую информацию вверх
        if (status === "add") {
            this.props.onChangeTask(
                e,
                text.trimLeft().trimRight(),
                this.props.currentTaskId,
                status
            );
        } else {
            this.props.onChangeTask(e, text.trimLeft().trimRight(), id, status);
        }
    };

    render() {
        const { currentTaskId, currentTaskInfo, onCloseEditPanel } = this.props;
        //Условный рендеринг
        if (currentTaskId != -1) {
            return (
                <div className="edit-container edit-task">
                    <header className="edit-container-header">
                        <span
                            className="edit-close"
                            onClick={onCloseEditPanel}
                        ></span>
                    </header>
                    <TextPanel
                        panelStatus={true}
                        currentTaskId={currentTaskId}
                        currentTaskInfo={currentTaskInfo[0]}
                        onTaskSubmit={this.onTaskSubmit}
                    />
                </div>
            );
        }

        return (
            <div className="edit-container edit-task">
                <p className="edit-notask-message">Выберите задачу</p>
            </div>
        );
    }
}
export default EditPanel;
