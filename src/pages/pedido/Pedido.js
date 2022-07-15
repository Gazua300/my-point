import { useContext, useState } from "react"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ScrollView
} from 'react-native'




const Pedido = (props)=>{
    const [quantidade, setQuantidade] = useState('')
    const [mesa, setMesa] = useState('')
    const { states } = useContext(Context)
    const pedido = states.pedido


    let total = pedido.preco * quantidade
        
    const finalizarCompra = async()=>{
        const id = await AsyncStorage.getItem('token')
        const body = {
            pedido: pedido.nome,
            user: id,
            mesa,
            quantidade
        }
        axios.post(`${url}/request/${pedido.id}`, body).then(res=>{
            alert(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const limpar = ()=>{
        setMesa('')
        setQuantidade('')
    }



    return(
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtStyle}>
                            {pedido.nome}
                        </Text>
                        <Text style={styles.txtStyle}>
                            R$ {pedido.preco}
                        </Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput style={styles.input}
                            onChangeText={setMesa}
                            value={mesa}
                            keyboardType='numeric'
                            placeholder="Mesa"
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'/>
                        <TextInput style={styles.inputQnt}
                            onChangeText={setQuantidade}
                            value={quantidade}
                            keyboardType='numeric' 
                            placeholder="Quantidade"
                            placeholderTextColor='rgba(255, 255, 255, 0.4)'/>                    
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:18}}>
                                Limpar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={finalizarCompra}>
                            <Text style={{color:'whitesmoke', fontSize:18}}>
                                Realizar pedido
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        color:'whitesmoke', fontSize:25, margin:30,
                        textAlign:'center'
                    }}>Total: R$ {total.toFixed(2)}</Text>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 30
    },
    txtContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30
    },
    txtStyle: {
        fontSize: 25,
        color: 'whitesmoke',               
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30
    },
    input: {
        fontSize: 20,
        color: 'whitesmoke',
        width: '30%',
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ae8625',
        borderRadius: 10,
        textAlign: 'center'
    },
    inputQnt: {
        width: '50%',
        borderBottomWidth: 2,
        borderColor: '#ae8625',
        borderRadius: 10,
        padding: 15,
        fontSize: 20,
        color: 'whitesmoke',
        textAlign: 'center'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30
    },
    button: {
        backgroundColor: '#ae8625',
        padding: 10,
        borderRadius: 10
    }
})

export default Pedido