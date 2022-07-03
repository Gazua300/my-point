import { useContext, useState } from "react"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'




const Pedido = (props)=>{
    const [produto, setProduto] = useState('')
    const { states, requests } = useContext(Context)
    const pedido = states.pedido


    
    const finalizarCompra = ()=>{
        const body = {
            pedido: produto,
            user: states.token,
        }
        axios.post(`${url}/request/${states.placeId}`, body).then(res=>{
            alert(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    return(
        <View style={styles.container}>
            <Text style={styles.txtStyle}>
                <Text style={{fontWeight:'bold'}}>Produto:</Text> {pedido.nome}{'\n'}
                <Text style={{fontWeight:'bold'}}>Marcas:</Text> {pedido.ingredientes}
            </Text>
            <View style={styles.formContainer}>
                <TextInput style={styles.input}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={setProduto}
                    value={produto} 
                    placeholder="Pode pedir outros produtos também."/>                
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={finalizarCompra}>
                    <Text style={{color:'whitesmoke'}}>Realizar compra</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={()=> setProduto('')}>
                    <Text style={{color:'whitesmoke'}}>Limpar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtStyle: {
        margin: 20,
        lineHeight: 30,
        fontSize: 20,                
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    input: {
        width: 250,
        height: 70,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        padding: 10,
        fontSize: 20
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10
    }
})

export default Pedido