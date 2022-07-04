import { useContext, useState } from "react"
import Context from "../../global/Context"
import axios from "axios"
import { url } from "../../constants/url"
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ImageBackground
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
        <ImageBackground
            style={{flex:1}}
            source={require('../../img/mypoint-wallpaper.jpg')}>
            <View style={styles.container}>
                <Text style={styles.txtStyle}>
                    <Text style={{fontWeight:'bold', lineHeight:50}}>Produto:</Text> {pedido.nome}{'\n'}
                    <Text style={{fontSize:15}}>{pedido.ingredientes}</Text>
                </Text>
                <View style={styles.formContainer}>
                    <TextInput style={styles.input}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={setProduto}
                        value={produto} 
                        placeholder="Pode pedir outros produtos por aqui também."
                        placeholderTextColor='whitesmoke'/>                
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
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop:50
    },
    txtStyle: {
        margin: 20,
        fontSize: 20,
        color: 'whitesmoke'                
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    input: {
        width: 370,
        height: 100,
        borderWidth: 2,
        borderColor: '#ae8625',
        borderRadius: 10,
        padding: 15,
        fontSize: 20,
        color: 'whitesmoke'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    button: {
        backgroundColor: '#ae8625',
        padding: 10,
        borderRadius: 10
    }
})

export default Pedido