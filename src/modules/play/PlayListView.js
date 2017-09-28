import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

import normalize from '../../wdui/helpers/normalizeText';
import Loading from '../../wdui/loading/Loading';
import Card from '../../wdui/Card';
import {URL} from '../../constants';

const deviceWidth = Dimensions.get('window').width;

class PlayListView extends Component {
  static displayName = 'PlayListView';

  static navigationOptions = {
    title: '玩法',
    tabBarIcon: (props) => (
      <Icon name='color-lens' size={24} color={props.tintColor} />
    )
  };

  static propTypes = {
    url: PropTypes.func.string,
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loading: true,
      nextLink: null,
      noMore: false,
      isRefreshing: false,
      loadingMore: false,
      url: URL.PLAY,
      data: []
    };
  }

  componentWillMount() {
    if (this.props.url) {
      this.setState({
        url: this.props.url
      });
    }
    this.fetchData();
  }

  onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.fetchData();
  }

  renderFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  fetchData() {
    this.setState({
      loading: true
    });
    axios.get(this.state.url)
    .then(response => {
      this.setState({
        data: response.data,
        plays: response.data.results,
        nextLink: response.data.next ? response.data.next : null,
        isRefreshing: false,
        loading: false
      });
    });
  }

  onEndReached() {
    if (!this.state.nextLink) {
      this.setState({
        noMore: true
      });
      return;
    }
    this.setState({
      loadingMore: true
    });

    axios.get(this.state.nextLink)
    .then(response => {
      this.setState({
        data: response.data,
        plays: this.state.plays.concat(response.data.results),
        nextLink: response.data.next ? response.data.next : null,
        loadingMore: false,
        loading: false
      });
    });
  }

  keyExtractor = (item, index) => `key${index}`;

  renderList = ({item}) => {
    const {navigate} = this.props.navigation;

    return (
      <TouchableHighlight
        onPress={() => navigate('PlayDetailView', item)}
        key={this.keyExtractor}>
        <View>
          <Card
            title={ item.title }>
            <View style={{paddingBottom: 15}}>
              { item.featured_image
                ? <FastImage
                  style={{width: deviceWidth - 60, height: (deviceWidth - 60) * 0.4}}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: URL.IMAGE_BASE + item.featured_image
                  }}
                />
                : <View />
              }
            </View>

            <Text style={{marginBottom: 10, fontSize: normalize(13), lineHeight: normalize(18)}}>
              { item.description }
            </Text>
          </Card>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    if (this.state.loading) {
      return <Loading text={'数据加载中'} />;
    }

    return (
      <View style={styles.container}>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.plays}
            refreshing={this.state.isRefreshing}
            renderItem={this.renderList}
            onRefresh={this.onRefresh.bind(this)}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.onEndReached.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default PlayListView;
