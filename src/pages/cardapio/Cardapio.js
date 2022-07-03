import { useContext, useState } from "react"
import Context from "../../global/Context"
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import axios from "axios"
import { url } from "../../constants/url"



const Cardapio = (props)=>{
    const { states, setters, requests } = useContext(Context)
    const cardapio = states.cardapio


    const fazerPedido = (id)=>{
        axios.get(`${url}/cardapio/user/${id}`).then(res=>{
            setters.setPedido(res.data)
            props.navigation.navigate('Pedido')
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <View>
            {cardapio && cardapio.map(item=>{
                return(
                    <View key={item.id}
                        style={styles.card}>
                        <Text style={styles.txtStyle}>{item.nome}</Text>
                            <Text style={{fontSize:15}}>{item.ingredientes}</Text>                        
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> fazerPedido(item.id)}>
                                <Text style={{color:'whitesmoke'}}>Pedir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        alignItems: 'center',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 23,
        lineHeight: 40
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'blue',
        width: 150,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
        margin: 10
    }
})

export default Cardapio