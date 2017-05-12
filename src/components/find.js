import React, { Component } from 'react'
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SegmentedControls } from 'react-native-radio-buttons'
import {  Text, List, ListItem, Thumbnail, Button, Icon } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { shareRide, getLift, setDestination, findPeers, addToList } from '../actions/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Find extends Component {
    constructor(props) {
        super(props)
        this.state = {
            destination: this.props.destination || ''
        }
    }
    componentDidMount() {
        this.props.dispatch({type: 'CLEAR', payload: null})
    }
    setSelectedOption = (selectedOption) => {
        this.props.dispatch({type: 'CLEAR', payload: null})
        if(selectedOption === 'Get Lift') {
            this.props.dispatch(getLift())
        } else if(selectedOption === 'Share your Ride') {
            this.props.dispatch(shareRide())
        }
    }
    handleTextChange = (destination) => {
        this.setState({
            destination
        })
        this.props.dispatch(setDestination(destination))
    }
    acceptInput = () => {
        if(this.props.find) {
            // todo
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let coordinates = [position.coords.latitude,position.coords.longitude]
                    if(this.props.find === 'Get Lift') {
                        this.props.dispatch(findPeers(this.state.destination,coordinates,'share'))
                        addToList(this.state.destination,coordinates,'lift')
                    } else {
                        this.props.dispatch(findPeers(this.state.destination,coordinates,'lift'))
                        addToList(this.state.destination,coordinates,'share')
                    }
                },
                (error) => alert(JSON.stringify(error)),
                {timeout: 20000, maximumAge: 1000}
            )
        }
    }
    onPress = () => {
        if(this.props.find) {
            // todo
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let coordinates = [position.coords.latitude,position.coords.longitude]
                    if(this.props.find === 'Get Lift') {
                        this.props.dispatch(findPeers(this.state.destination,coordinates,'share'))
                        addToList(this.state.destination,coordinates,'lift')
                    } else {
                        this.props.dispatch(findPeers(this.state.destination,coordinates,'lift'))
                        addToList(this.state.destination,coordinates,'share')
                    }
                },
                (error) => alert(JSON.stringify(error)),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            )
        }
    }
    handleButton = (item) => {
        const navigate = NavigationActions.navigate({
            routeName: 'Chat',
            action: NavigationActions.navigate({ routeName: 'Message', params: item})
        })
        this.props.navigation.dispatch(navigate)
    }
    render() {
        const options = [
            'Get Lift',
            'Share your Ride'
        ]
        console.log(this.props.peers)
        const items = this.props.peers
        return (
            <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.Inputcontainer}>
                    <View style={styles.input}>
                        <TextInput placeholder='Destination' style={styles.itext} value={this.state.destination} onChangeText={this.handleTextChange} onEndEditing={this.acceptInput} />
                        <TouchableOpacity onPress={this.onPress}>
                            <Icon name='search' />
                        </TouchableOpacity>
                    </View>
                    <SegmentedControls 
                        options={ options } 
                        onSelection={this.setSelectedOption}
                        selectedOption = {this.props.find}
                        optionStyle={{fontSize: 18}}
                    />
                </View>
                <View style={styles.listContainer}>
                        <List dataArray={items}
                            renderRow={(item) =>
                            <ListItem>
                                <Thumbnail circular style={{ width: 80, height: 80, margin: 10 }} source={{uri: item.photoURL}} />
                                <View style={styles.info}>
                                    <Text>{item.displayName}</Text>
                                    <Text note>{item.distance.toFixed(2)} km away</Text>
                                </View>
                                    <Button onPress={() => this.handleButton(item)} style={{ alignSelf: 'center' }}>
                                        <Text>Chat</Text>
                                    </Button>
                            </ListItem>
                        }>
                        </List>
                        
                </View>
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    Inputcontainer: {
        flex: 1
    },
    listContainer: {
        flex: 6,
        flexWrap: 'wrap'
    },
    itext: {
        width: '90%',
        fontSize: 20,
        color: 'green',
        textAlign: 'center'
    },
    info: {
        flex: 1
    }
})

const mapStateToProps = (state) => ({
    find: state.find,
    destination: state.destination,
    user: state.user,
    peers: state.peers
})

export default connect(mapStateToProps)(Find)