import { useContext, useState } from "react"
import Context from "../../global/Context"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native'
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
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    {cardapio.length > 0 ? cardapio.map(item=>{
                        return(
                            <View key={item.id}
                                style={styles.card}>
                                <Text style={styles.txtStyle}>{item.nome}</Text>
                                <Text style={{fontSize:15, color:'whitesmoke'}}>{item.ingredientes}</Text>
                                <TouchableOpacity style={styles.button}
                                    onPress={()=> fazerPedido(item.id)}>
                                    <Text style={{color:'whitesmoke', fontSize:18}}>
                                        Pedir
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }) : <Text style={styles.txtTemp}>O estabelecimento ainda não inseriu o cardápio</Text>}
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 50
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ae8625',
        margin: 15,
        padding: 10,
        borderRadius: 10
    },
    txtStyle: {
        fontSize: 23,
        lineHeight: 40,
        color: 'whitesmoke'
    },
    txtTemp: {
        marginTop: 100,
        marginHorizontal: 50,
        textAlign: 'center',
        fontSize: 20,
        color: 'whitesmoke'
    },
    button: {
        backgroundColor: '#ae8625',
        width: 150,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
        margin: 10
    }
})

export default Cardapio