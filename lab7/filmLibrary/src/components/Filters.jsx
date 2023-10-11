import {ListGroup} from 'react-bootstrap/';

/**
 * This components requires:
 * - the list of filters labels to show, 
 * - the filter that is currenctly selected 
 * - the handler to notify a new selection
 */ 
const Filters = (props) => {
  const {items, selected, onSelect} = props;

  // Converting the object into an array to use map method
  const filterArray = Object.entries(items);

  return (
    <ListGroup as="ul" variant="flush">
        {
          filterArray.map(([filterName, { label }]) => {
            return (
                <ListGroup.Item as="li" key={filterName} href={'#' + filterName} onClick={() => onSelect(filterName)}
                action active={selected === filterName ? true : false} >
                    {label}
                </ListGroup.Item>
            );
          })
        }
    </ListGroup>
  )
}

export default Filters;
