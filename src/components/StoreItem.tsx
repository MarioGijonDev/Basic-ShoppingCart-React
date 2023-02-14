
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

// Definimos el tipo del objeto que contiene las propiedades del producto
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

// Componente producto de la tienda
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {

  // Obtenemos los valores del contexto ShoppingCartContext
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  // Inicializamos la cantidad del producto existente en el carrito
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {
            // Si no hay ninguno del mismo producto en la cesta, agregamos el botón de añadir a la cesta
            // Y si lo hay, agregamos los botones para sumar o restar el número del mismo producto al carrito y el botón de borrar producto
            quantity === 0 ?
              (<Button className="w-100" onClick={()=> increaseCartQuantity(id)}>+ Add To Cart</Button>) 
            :
              <div className="d-flex align-items-center flex-column" style={{gap: '.5rem'}}>
                <div className="d-flex align-items-center justify-content-center" style={{gap: '.5rem'}}>
                  <Button onClick={()=> decreaseCartQuantity(id)}>-</Button>
                    <div><span className="fs-3">{quantity}</span> in cart</div>
                  <Button onClick={()=> increaseCartQuantity(id)}>+</Button>
                </div>
                  <Button variant="danger" size="sm" onClick={()=> removeFromCart(id)}>Remove</Button>
              </div>
          }
        </div>
      </Card.Body>
    </Card>
  );
}
