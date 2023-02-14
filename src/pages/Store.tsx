
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import storeItems from '../data/items.json';

export default function Store(){

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {
          // Añadimos todos los productos del stock
          storeItems.map(item => (
            <Col>
              <StoreItem key={item.id} {...item} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}