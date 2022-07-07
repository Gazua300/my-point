import { useEffect, useState, useContext } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import Edit from 'react-native-vector-icons/Entypo'
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native'



const Perfil = (props)=>{
    const { states, requests } = useContext(Context)
    const perfil = states.perfil    
    const [pedidos, setPedidos] = useState([]) 

            
    useEffect(()=>{
        pegarPedidos()
        requests.getProfile()
    }, [])

       
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
                <View style={styles.profileContainer}>
                    <View style={styles.profileContent}>
                        <Text style={styles.txtStyle}>
                            {perfil.nome}{'\n'}
                            {perfil.email}
                        </Text>
                        <TouchableOpacity
                            onPress={()=> props.navigation.navigate('Auth')}>
                            <Edit name='edit' color='whitesmoke' size={25}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={confirmarLogout}>
                        <Text style={{color:'whitesmoke', fontSize:18}}>
                            Deslogar
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleStyle}>Seus pedidos</Text>
                <View style={styles.line}/>
                <ScrollView>
                    {pedidos.length > 0 ? pedidos.map(pedido=>{
                        return(
                            <View key={pedido.id}
                                style={styles.card}>
                                <Text style={styles.placeStyle}>
                                    {pedido.estabelecimentoNome}
                                </Text>
                                <Text style={styles.txt}>
                                    {pedido.pedido}                                    
                                </Text>
                                <Text style={{color:'whitesmoke', fontSize:20}}>
                                    Mesa {pedido.mesa}{'\n'}
                                </Text>
                                <TouchableOpacity style={styles.button}
                                    onPress={()=> confirmarRemover(pedido.id)}>
                                    <Text style={{color:'whitesmoke', fontSize:18}}>Remover</Text>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 20
    },
    profileContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtStyle: {
        fontSize: 20,
        color: 'whitesmoke',
        marginBottom: 20
    },
    placeStyle: {
        color: 'whitesmoke',
        fontSize: 25,
        textAlign: 'center'
    },
    txt: {
        fontSize: 18,
        color: 'whitesmoke',
        marginBottom: 5
    },
    button: {
        backgroundColor: '#ae8625',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    titleStyle: {
        color: 'whitesmoke',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 30
    },    
    line: {
        borderWidth: 1,
        borderColor: '#ae8625',
        margin: 10
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 2,
        borderColor: '#ad8625',
        borderRadius: 10,
        margin: 15,
        padding: 15
    },
})

export default Perfil