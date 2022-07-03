import axios from "axios"
import { createContext, useState } from "react"
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [token, setToken] = useState('')
    const [places, setPlaces] = useState([])
    const [placeId, setPlaceId] = useState('')
    const [clientId, setClientId] = useState('')
    const [cardapio, setCardapio] = useState([])
    const [pedido, setPedido] = useState({})



    const getAllUsers = ()=>{
        axios.get(`${url}/clients`).then(res=>{
            setPlaces(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const insertClient = ()=>{
        const body = {
            user: token
        }
        axios.post(`${url}/user/client/${placeId}`, body).then(res=>{
            setClientId(res.data)
            alert('Parabéns agora você é um cliente')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    
    const states = { token, places, cardapio, pedido, placeId, clientId }
    const setters = { setToken, setCardapio, setPedido, setPlaceId }
    const requests = { getAllUsers, insertClient }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context