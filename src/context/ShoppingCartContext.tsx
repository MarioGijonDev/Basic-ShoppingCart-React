
import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Definimos el tipo de tendrá las propiedades del contexto
type ShoppingCartProviderProps = {
  children: ReactNode
}

// Definimos el tipo de cada item añadido al carrito
type CartItem = {
  id: number
  quantity: number
}

// Definimos el tipo de objeto que almacenará el contexto
type ShoppingCartContext = {
  showHideCart: ()=> void,
  getItemQuantity: (id: number) => number,
  increaseCartQuantity: (id: number) => void,
  decreaseCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
  cartQuantity: number,
  cartItems: CartItem[]
}

// Creamos el contexto
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Función que devolverá el hook useContext con el contenido del contexto para obtener los datos almacenados
export function useShoppingCart(){
  return useContext(ShoppingCartContext);
}

// Componente del provider del contexto
export function ShoppingCartProvider({ children }:ShoppingCartProviderProps){

  const [isOpen, setIsOpen] = useState(false);

  // Estado del elemento del carrito
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const showHideCart = ()=> setIsOpen(!isOpen);

  // Obtener cantidad del mismo tipo en el carrito
  function getItemQuantity(id:number){
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  // Aumentar en 1 la cantidad del producto
  // Si no existe, lo creamos
  function increaseCartQuantity(id: number){
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map(item => {
          if (item.id === id)
            return { ...item, quantity: item.quantity + 1 };
          else
            return item

        });
      }
    })
  }

  // Disminuir en 1 la cantidad del producto
  // Si solo quedaba uno, eliminamos el producto de la cesta
  function decreaseCartQuantity(id: number){
    setCartItems(currentItems => {
      if(currentItems.find(item => item.id === id)?.quantity === 1){
        return currentItems.filter(item => item.id !== id);
      }else{
        return currentItems.map(item => {
          if(item.id === id)
            return {...item, quantity: item.quantity - 1};
          else
            return item;
        })
      }
    })
  }

  // Eliminamos un elemento del carrito
  function removeFromCart(id: number){
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id);
    })
  }



  return(
    <ShoppingCartContext.Provider
      value={{
        showHideCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems
      }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}