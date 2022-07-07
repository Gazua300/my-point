import { useContext, useState } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/url'
import { View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native'



const EditPerfil = (props)=>{
    const { requests } = useContext(Context)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')



    const atualizar = async()=>{
        const id = await AsyncStorage.getItem('token')
        const body = {
            nome,
            email,
        }
        axios.put(`${url}/user/${id}`, body).then(res=>{
            props.navigation.navigate('Perfil')
            requests.getProfile()
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const confirmar = ()=>{
        Alert.alert(
            'Alerta',
            'Tem certeza que deseja alterar seus dados?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> atualizar()
                }
            ]
        )
    }


    const limpar = ()=>{
        setEmail('')
        setNome('')
    }


    const logout = async()=>{
        try{
            await AsyncStorage.clear()
        }catch(e){
            alert(e)
        }
    }


    const delConta = async()=>{
        const id = await AsyncStorage.getItem('token')

        axios.delete(`${url}/user/${id}`).then(res=>{
            alert(res.data)
            logout()
            props.navigation.navigate('Login')
        }).catch(e=>{
            alert(e.response.data)
        })
    }

    const delConfirm = ()=>{
        Alert.alert(
            'Atenção!',
            'Está operação irá apagar todos os pedidos relacionados a sua conta também. Deseja continuar?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> delConta()
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
                    <TextInput style={styles.input}
                        onChangeText={setNome}
                        value={nome}
                        placeholder="Nome"
                        placeholderTextColor='whitesmoke'/>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="nome@email.com"
                        placeholderTextColor='whitesmoke'/>                    
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={confirmar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Salvar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={limpar}>
                            <Text style={{color:'whitesmoke', fontSize:20}}>
                                Limpar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnDeletar}
                        onPress={delConfirm}>
                        <Text style={{fontSize:20, color:'whitesmoke'}}>
                            Deletar conta
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        paddingTop: 50
    },
    input: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ae8625',
        paddingLeft: 15,
        fontSize: 20,
        margin: 13,
        width: 350,
        height: 50,
        color: 'whitesmoke'
    },
    btnContainer: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    },
    btnDeletar: {
        backgroundColor: '#ae8625',
        borderWidth: 1,
        borderColor: 'goldenrod',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 15
    }
})

export default EditPerfil