import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { imageSources } from '../Config';
import Button from './Button';
import FastImage from 'react-native-fast-image';

const IMAGE_WIDTH = 200;

type Props = {
    onItemSelected: Function
};

export default class ExampleDogs extends React.PureComponent<Props> {
    _onImagePress = (index) => {
        this.props.onItemSelected(index);
    };

    _renderItem = (index) => {
        return (
            <TouchableOpacity onPress={() => this._onImagePress(index)} key={index}>
                <View style={styles.container}>
                    <FastImage source={imageSources[index]} style={styles.image} />
                    <Button
                        onPress={() => this._onImagePress(index)}
                        title={'Use this photo'}
                        textStyle={styles.buttonText}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    constructor(props) {
        super(props);

        this._scrollView = null;
    }

    componentDidMount() {
        const { width } = Dimensions.get('window');

        this._scrollView.scrollTo({
            x: (IMAGE_WIDTH * 3 - width) / 2,
            y: 0,
            animated: true
        });
    }

    render() {
        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                ref={(c) => (this._scrollView = c)}
            >
                {[...Array(10)].map((x, i) => this._renderItem(i))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: IMAGE_WIDTH,
        height: 200
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center'
    }
});
