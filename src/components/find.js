import React, { Component } from 'react'
import { View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { SegmentedControls } from 'react-native-radio-buttons'
import {  Text, List, ListItem, Thumbnail, Button } from 'native-base'

export default class Find extends Component {
    constructor() {
        super()
        this.state = {}
    }
    setSelectedOption = (selectedOption) => {
        this.setState({
            selectedOption
        })
    }
    render() {
        const options = [
            'Get Lift',
            'Share your Ride'
        ]
        const items = [
            'light',
            'mesa',
            'L',
            'Near',
            'Sakura',
            'Hinata',
            'Tsunade'
        ]
        return (
            <View style={styles.container}>
                <View style={styles.Inputcontainer}>
                    <TextInput placeholder='Destination' style={styles.itext} />
                    <SegmentedControls 
                        options={ options } 
                        onSelection={this.setSelectedOption}
                        selectedOption = {this.state.selectedOption}
                        optionStyle={{fontSize: 18}}
                    />
                </View>
                <View style={styles.listContainer}>
                    <ScrollView>
                        <List dataArray={items}
                            renderRow={(item) =>
                            <ListItem>
                                <Thumbnail circular style={{ width: 80, height: 80, margin: 10 }} source={require('../light.jpg')} />
                                <View style={styles.info}>
                                    <Text>{item}</Text>
                                    <Text note>150 m away</Text>
                                </View>
                                    <Button style={{ alignSelf: 'center' }}>
                                        <Text>Chat</Text>
                                    </Button>
                            </ListItem>
                        }>
                        </List>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize: 20,
        color: 'green',
        textAlign: 'center'
    },
    info: {
        flex: 1
    }
})