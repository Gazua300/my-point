import { useContext } from "react"
import Context from "../../global/Context"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    RefreshControl
} from 'react-native'
import axios from "axios"
import { url } from "../../constants/url"



const Cardapio = (props)=>{
    const { states, setters } = useContext(Context)
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
                                <View style={styles.produto}>
                                    <Text style={styles.txtStyle}>{item.nome}</Text>
                                    <Text style={styles.txtStyle}>R$ {item.preco}</Text>                                    
                                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    card: {
        borderWidth: 2,
        borderColor: '#ae8625',
        margin: 15,
        padding: 15,
        borderRadius: 10
    },
    produto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtStyle: {
        fontSize: 23,
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
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    }
})

export default Cardapio