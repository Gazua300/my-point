import axios from "axios"
import { createContext, useState } from "react"
import { url } from "../constants/url"


const Context = createContext()


export const GlobalState = (props)=>{
    const [token, setToken] = useState('')
    const [places, setPlaces] = useState([])
console.log(places)


    const getAllUsers = ()=>{
        axios.get(`${url}/clients`).then(res=>{
            setPlaces(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }



    const states = { token, places }
    const setters = { setToken }
    const requests = { getAllUsers }

    return(
        <Context.Provider value={{ states, setters, requests }}>
            {props.children}
        </Context.Provider>
    )
}

export default Context