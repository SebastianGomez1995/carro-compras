import React, { useContext , useEffect} from 'react'
import ProductsContext from '../context/ProductsContext'
import { Button, HStack, Stack } from '@chakra-ui/react'

export default function ContentTotal() {
  const ctx = useContext(ProductsContext)
  const{checkout,total,actualizarTotal} = ctx

  useEffect(()=>{
    actualizarTotal()
  },[checkout])

  return (
   <Stack className='containerTotal'>
        <HStack>
            <p>Nombre</p>
            <p>Cantidad</p>
            <p>Precio Unidad</p>
            <p>Precio Total</p>
        </HStack>
      {checkout.map((e,i)=>{
        return(
          <HStack key={i} >
            <p>{e.nombre}</p>
            <p>{`x${e.cantidad}`}</p>
            <p>{`$ ${e.precio}`}</p>
            <p>{`$ ${e.precio*e.cantidad}`}</p>
          </HStack>
        )
      })}
      <h2>Total ${total} uds</h2>
      <Button>Pagar</Button>

   </Stack>
  )
}
