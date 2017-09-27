import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';

import {URL} from '../../constants';
import MarkdownHelper from '../../utils/MarkdownHelper';

const deviceWidth = Dimensions.get('window').width;

class PlayDetailView extends Component {
  static displayName = 'PlayDetailView';

  static navigationOptions = ({navigation}) => ({
    title: `玩法: ${navigation.state.params.title}`
  });

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {params} = this.props.navigation.state;
    const htmlContent = MarkdownHelper.convert(params.content);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingBottom: 15}}>
            { params.featured_image
              ? <FastImage
                style={{width: deviceWidth, height: (deviceWidth) * 0.4}}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: URL.IMAGE_BASE + params.featured_image
                }}
              />
              : <View />
            }
          </View>
          <Text>{ params.title }</Text>
          <HTMLView
            value={htmlContent}
            stylesheet={styles}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default PlayDetailView;
