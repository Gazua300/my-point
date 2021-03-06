import { useContext, useEffect } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { url } from '../../constants/url'




const Home = (props)=>{
    const { requests, setters, states } = useContext(Context)
    const places = states.places
    



    useEffect(()=>{
        requests.getAllUsers()
    }, [])


    const cardapio = (id)=>{
        axios.get(`${url}/cardapio/place/${id}`).then(res=>{
            setters.setCardapio(res.data)
            setters.setPlaceId(id)
            props.navigation.navigate('Cardapio')
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
                    {places.length > 0 ? places.map(place=>{
                        return(
                            <View key={place.id}
                                style={styles.card}>
                                <View>
                                    <Text style={styles.title}>
                                        {place.nome}                                    
                                    </Text>
                                    <Text style={styles.txtStyle}>
                                        {place.servico}{'\n'}
                                        {place.mesas} lugares{'\n'}
                                        {place.endereco}{'\n'}
                                        ({String(place.contato).substring(0,2)}){' '}
                                        {String(place.contato).substring(2,6)}-
                                        {String(place.contato).substring(6,10)}

                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.button}
                                    onPress={()=> cardapio(place.id)}>
                                    <Text style={{color:'whitesmoke', fontSize:18}}>
                                        Cardapio
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }) : <Text style={styles.txtTemp}>
                            Ainda n??o h?? estabelecimentos cadastrados
                         </Text>}
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
        borderWidth: 2,
        borderColor: '#ad8625',
        borderRadius: 10,
        margin: 15,
        padding: 10
    },
    title: {
        fontSize: 25,
        color: 'whitesmoke',
        textAlign: 'center',
        marginBottom: 20
    },
    txtStyle: {
        fontSize: 18,
        color: 'whitesmoke',
        lineHeight: 25,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#ae8625',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    txtTemp: {
        fontSize: 20,
        color: 'whitesmoke',
        margin: 20,
        textAlign: 'center'
    }
})

export default Home