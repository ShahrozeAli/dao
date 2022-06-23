import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
  margin: 8px;
  // border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 15px;
  color: white;
  font-size: 24px;
  background-color: #5a4860;
  border-radius: 15px 15px 0px 0px;
  text-align: center;
`;
const TaskList = styled.div`
  // padding: 8px;
  margin-top: 10px;
  transition: background-color 0.2s ease;
  // background-color: ${(props) =>
    props.isDraggingOver ? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
  background-color: #100e2e !important;
  // border-right: 1px solid #4a4a4a;
  // border-left: 1px solid #4a4a4a;
`;

export default class Column extends React.Component {
  render() {
    const { title } = this.props.column;

    const checkTitle = () => {
      if (title === 'OPEN BOUNTIES') {
        return '#c4c4c4';
      } else if (title === 'ASSIGNED/IN PROGRESS') {
        return '#5F71D4';
      } else if (title === 'UNDER REVIEW') {
        return '#A516B9';
      }
      if (title === 'CLOSE / REWARDED') {
        return '#06DBAC';
      }
    };

    return (
      <Container>
        <Title style={{ borderBottom: `5px solid ${checkTitle()}` }}>
          {this.props.column.title}
        </Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              style={{
                borderRight: '1px solid #4a4a4a',
                borderLeft: '1px solid #4a4a4a',
                padding: '0% 5%',
                marginTop: '5%',
              }}
            >
              <TaskList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={this.props.column.id}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            </div>
          )}
        </Droppable>
      </Container>
    );
  }
}
