import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {URL} from '../../constants';
import MarkdownHelper from '../../utils/MarkdownHelper';
import NativeHtmlViewRender from '../../wdui/NativeHtmlViewRender';

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
    const htmlContent = MarkdownHelper.convert(params.content, {width: deviceWidth});

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
          <Text style={styles.title}>{ params.title }</Text>
          <NativeHtmlViewRender
            html={htmlContent}
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
  },
  title: {
    color: '#384452',
    alignItems: 'center',
    fontSize: 24,
    padding: 10
  }
});

export default PlayDetailView;
