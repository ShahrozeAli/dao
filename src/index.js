import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
  display: flex;
  // position: absolute;
  // left: 10%;
  // top: 10%;
  padding: 2%;
`;

class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{ backgroundColor: "#100E2E", padding: "5%" }}>
            <div style={{ borderBottom: '1px solid #4A4A4A', padding: '1%', width: "90%", margin: '0 auto' }}>
              <h2 style={{
                color: 'white', textAlign: 'center', fontWeight: "700", fontSize: "2.25rem",
                lineHeight: "2.5rem",
              }}>Bounties</h2>
            </div>
            <Container>
              {this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(
                  taskId => this.state.tasks[taskId],
                );

                return (
                  <div style={{ display: 'flex', flexDirection: 'row', width: "30vw" }}>
                    {/* <div style={{ borderLeft: '1px solid #4A4A4A', height: '60vh', margin: "0% 1%" }}></div> */}
                    <Column key={column.id} column={column} tasks={tasks} />
                    {/* <div style={{ borderLeft: '1px solid #4A4A4A', height: '60vh', margin: "0% 1%" }}></div> */}
                  </div>
                )
              })}
            </Container>
          </div>
        </DragDropContext >
      </div >
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
