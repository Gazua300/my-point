import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { createContext, useState } from "react"
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [token, setToken] = useState('')
    const [places, setPlaces] = useState([])
    const [placeId, setPlaceId] = useState('')
    const [cardapio, setCardapio] = useState([])
    const [pedido, setPedido] = useState({})
    const [perfil, setPerfil] = useState({})
    

    

    const getToken = async(tk)=>{
        try{
            await AsyncStorage.setItem('token', tk)
            const value = await AsyncStorage.getItem('token')
            setToken(value)
        }catch(e){
            alert(e)
        }
    }


    const getAllUsers = ()=>{
        axios.get(`${url}/clients`).then(res=>{
            setPlaces(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const getProfile = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.get(`${url}/user/${id}`).then(res=>{
            setPerfil(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    
    const states = { token, places, cardapio, pedido, placeId, perfil }
    const setters = { setToken, setCardapio, setPedido, setPlaceId, getToken }
    const requests = { getAllUsers, getProfile }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context