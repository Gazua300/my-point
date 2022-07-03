import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/url'
import { View, Text, StyleSheet } from 'react-native'



const Perfil = (props)=>{
    const { states } = useContext(Context)
    const [perfil, setPerfil] = useState({}) 

    
    useEffect(()=>{
        getProfile()
    }, [])

        
    const getProfile = ()=>{
        axios.get(`${url}/user/${states.token}`).then(res=>{
            setPerfil(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>{perfil.nome}</Text>
            <Text style={styles.txtStyle}>{perfil.email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        top: '20%' 
    },
    title: {
        fontSize: 30,
        margin: 20
    },
    txtStyle: {
        marginLeft: 20,
        fontSize: 20,
        lineHeight: 30
    }
})

export default Perfil