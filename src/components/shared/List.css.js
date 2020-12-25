import styled from 'styled-components';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: ${({ direction }) => (direction === 'row' ? 'inline' : 'block')};
  }
`;

List.defaultProps = {
  direction: 'row',
};

export default List;
