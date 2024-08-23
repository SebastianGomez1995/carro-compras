import React, { useContext } from 'react'
import { Wrap,Button, HStack,VStack, Stack } from '@chakra-ui/react'
import ProductsContext from '../context/ProductsContext'

export default function SectionArticle() {
  /*paso 7: generamos el contexto para poner consumirlo
  hacemos la desestructuracion para traer la variable helados*/
  const ctx = useContext(ProductsContext)
  const {helados,agregarHeladoCarro} = ctx

  const manejarClick = (elemento) =>{
    agregarHeladoCarro(elemento)
  }
  return (
    <Wrap spacing="4" justify="center" className='containerArticle'>
      {/*paso 8: realizamos el map para traer cada elemento */
      helados.map((helado,index)=>{
        return(
            <HStack pb={"10px"} key={index} className='producto'>
              <img src={helado.img} alt={helado.img} width={"100px"}/>
              <VStack pb={"10px"}>
                <p>{helado.nombre}</p>
                <p>{`$ ${helado.precio} UDS`}</p>
                <Button onClick={()=>manejarClick(helado)}>Agregar al Carrito</Button>
              </VStack>
            </HStack>
          )
      })}
    </Wrap>
  )
}

