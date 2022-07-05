import { useContext, useEffect, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native'



const Perfil = (props)=>{
    const [perfil, setPerfil] = useState({})
    const [pedidos, setPedidos] = useState([]) 

    console.log(pedidos)
        
    useEffect(()=>{
        pegarPedidos()
        getProfile()
    }, [])


        
    const getProfile = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.get(`${url}/user/${id}`).then(res=>{
            setPerfil(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const pegarPedidos = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.get(`${url}/requests/${id}`).then(res=>{
            setPedidos(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const sair = async()=>{
        try{
            await AsyncStorage.clear()
            props.navigation.navigate('Login')
        }catch(e){
            alert(e)
        }
    }

    const confirmarLogout = ()=>{
        Alert.alert(
            'Alerta',
            'Tem certeza que deseja sair da sua conta?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> sair()
                }
            ]
        )
    }


    const remover = (id)=>{
        axios.delete(`${url}/request/${id}`).then(res=>{
            pegarPedidos()
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    const confirmarRemover = (id)=>{
        Alert.alert(
            'Alerta',
            'Tem certeza que quer remover seu pedido?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> remover(id)
                }
            ]
        )
    }


    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.profileContainer}>
                        <Text style={styles.txtStyle}>
                            {perfil.nome}{'\n'}
                            {perfil.email}
                        </Text>
                        <TouchableOpacity style={styles.button}
                            onPress={confirmarLogout}>
                            <Text style={{color:'whitesmoke'}}>Deslogar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleStyle}>Seus pedidos</Text>
                    <View style={styles.line}/>
                    {pedidos.length > 0 ? pedidos.map(pedido=>{
                        return(
                            <View key={pedido.id}
                                style={styles.card}>
                                <Text style={{fontSize:20, color:'whitesmoke'}}>
                                    {pedido.estabelecimentoNome}
                                </Text>
                                <Text style={{fontSize:15, color:'whitesmoke', marginBottom:20}}>
                                    {pedido.pedido}{'\n'}
                                    Feito às {pedido.ordem}
                                </Text>
                                <TouchableOpacity style={styles.button}
                                    onPress={()=> confirmarRemover(pedido.id)}>
                                    <Text style={{color:'whitesmoke'}}>Remover</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }) : <Text style={{
                        color: 'whitesmoke',
                        fontSize: 20,
                        textAlign: 'center',
                        marginTop: 50
                    }}>Você ainda não fez nenhum pedido</Text>}
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
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20
    },
    txtStyle: {
        fontSize: 20,
        color: 'whitesmoke',
    },
    button: {
        backgroundColor: '#ae8625',
        width: 80,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    titleStyle: {
        color: 'whitesmoke',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50
    },    
    line: {
        borderWidth: 1,
        borderColor: '#ae8625',
        margin: 10
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ad8625',
        borderRadius: 10,
        margin: 15,
        padding: 15
    },
})

export default Perfil