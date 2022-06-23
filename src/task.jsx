import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  // border: 1px solid lightgrey;
  background-color: #5a4860 !important;
  border-radius: 2px;
  // padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
  color: white;
  border-radius: 15px;
`;

export default class Task extends React.Component {
  render() {
    const { columnId } = this.props;
    const checkTitle = () => {
      if (columnId === 'column-1') {
        return '#c4c4c4';
      } else if (columnId === 'column-2') {
        return '#5F71D4';
      } else if (columnId === 'column-3') {
        return '#A516B9';
      }
      if (columnId === 'column-4') {
        return '#06DBAC';
      }
    };

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div>
              <h3
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 700,
                  fontSize: '20px',
                  lineHeight: '1.75rem',
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  marginBottom: '1.25rem',
                  paddingTop: '7%',
                }}
              >
                {this.props.task.heading}
              </h3>
            </div>
            <div>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.25rem',
                  paddingLeft: '1.25rem',
                  paddingRight: '1.25rem',
                  marginBottom: '1.25rem',
                }}
              >
                {this.props.task.content}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: checkTitle(),
                fontWeight: '600',
                fontSize: '15px',
                padding: '0.5rem 1.25rem',
                borderRadius: '0px 0px 15px 15px',
                color: columnId === 'column-1' ? '#1F1F1F' : 'white',
              }}
            >
              <div> Reward: ${this.props.task.reward}</div>
              <div> Time left: {this.props.task.time} Days</div>
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}
