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
                                <Text style={styles.txtStyle}>
                                    {place.nome}{'\n'}
                                    <Text style={{fontSize:15}}>{place.servico}</Text>
                                </Text>
                                <TouchableOpacity style={styles.button}
                                    onPress={()=> cardapio(place.id)}>
                                    <Text style={{color:'whitesmoke'}}>Cardapio</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }) : <View style={{alignItems:'center'}}><View style={styles.loading}/></View>}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ad8625',
        borderRadius: 10,
        margin: 15,
        padding: 15
    },
    txtStyle: {
        fontSize: 25,
        lineHeight: 30,
        color: 'whitesmoke'
    },
    button: {
        backgroundColor: '#ae8625',
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center'
    },
    loading: {
        borderWidth: 3,
        borderTopWidth: 0,
        borderRightWidth: 0,        
        borderColor: '#ae8625',
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})

export default Home