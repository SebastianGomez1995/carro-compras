//Componente para armar la estructura del estado

import React, {useReducer} from "react";
import ProductsContext from "./ProductsContext"; 
import ProductsReducer from './ProductsReducer'
import {ACTUALIZAR_TOTAL,AGREGAR_HELADO} from "../types";


//paso 2: definir una funcion de expresion que permite gestionar el estado global

const ProductsState = props =>{
    //paso 3: inicializar el estado
    const initialState = {
        helados: [
            {
                id: 1,
                nombre:"Helado sencillo",
                precio: 2,
                img: "/anna-ribes-alEZLDPPRBU-unsplash.jpg"
            },
            {
                id: 2,
                nombre:"Helado doble",
                precio: 3.50,
                img: "/rachael-gorjestani-HLt6jQLf_J0-unsplash.jpg"
            },
            {
                id: 3,
                nombre:"Helado triple",
                precio: 4.50,
                img: "/sarah-gualtieri-tr9GO9WXNRI-unsplash.jpg"
            },
            {
                id: 4,
                nombre:"Malteada",
                precio: 2,
                img: "/natalie-toombs-KwCaIGKdlps-unsplash.jpg"
            },
        ],
        checkout:[], //variable que llevara el conteo de que productos se agragan al carro
        total: 0 //variable que llevara el valor total
    }
    /*paso 4: desestructuracion de objeto [state,dispatch]:
    state es el estado global que se va a manipular
    dispatch acciones del usuario, permite conectar con los Reducer*/

    const [state,dispatch] = useReducer(ProductsReducer, initialState)

    //paso 4: crear funciones para actualizar los estados de la interfaz
    const actualizarTotal = () =>{
        const total = state.checkout.reduce((acumulador, valorProducto) =>{
            return acumulador + (valorProducto.precio*valorProducto.cantidad)
        },0)

        dispatch({
            type:ACTUALIZAR_TOTAL,
            payload: total
        })
    }
    const agregarHeladoCarro = (datos) =>{
        //establecer el valor inicial en 1
        let nuevoDatos = {...datos, cantidad: 1}
        //verificar si ya han comprado este helado
        const coincidenciaID = state.checkout.find((e)=>{
            return (e.id === datos.id)
        })
        //acumular la cantidad si ya hay existencia previa
        if(coincidenciaID !== undefined){
            nuevoDatos = {
                ...datos,
                cantidad: coincidenciaID.cantidad += 1
            }
        }
        //eliminamos la duplicacion en la interfaz
        const eliminarCoincidencia = state.checkout.filter((e)=>{
            return(e.id !== datos.id)
        })

        //pasamos el arreglo sin coincidencias y cantidades actualizadas
        const arrModificado = [nuevoDatos,...eliminarCoincidencia]

        dispatch({
            type: AGREGAR_HELADO,
            payload: arrModificado
        })
    }

    //paso 5: retornar el contexto, la variable value permite enviar el estado a los componentes hijos

    return (
        <ProductsContext.Provider value={{
            helados: state.helados,
            total: state.total,
            checkout: state.checkout,
            agregarHeladoCarro,
            actualizarTotal
        }}>
            {props.children}
        </ProductsContext.Provider>)

}

export default ProductsState