/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  View,
  Text
} from 'react-native';

import Pdf from 'react-native-pdf';

class PDFView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageCount: 1
    };
    this.pdf = null;
  }

  componentDidMount() {
  }

  prePage=() => {
    if (this.pdf) {
      let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
      this.pdf.setNativeProps({page: prePage});
      this.setState({page: prePage});
      console.log(`prePage: ${prePage}`);
    }
  };

  nextPage=() => {
    if (this.pdf) {
      let nextPage = this.state.page + 1 > this.state.pageCount ? this.state.pageCount : this.state.page + 1;
      this.pdf.setNativeProps({page: nextPage});
      this.setState({page: nextPage});
      console.log(`nextPage: ${nextPage}`);
    }

  }

  render() {
    const {params} = this.props.navigation.state;
    let source = require('../cheatsheets/pinout/arduino-uno.pdf');  // ios only
    if (!__DEV__) {
      source = {uri: params};
    }

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight disabled={this.state.page === 1} style={this.state.page === 1 ? styles.btnDisable : styles.btn} onPress={() => this.prePage()}>
            <Text style={styles.btnText}>{'上一页'}</Text>
          </TouchableHighlight>
          <TouchableHighlight disabled={this.state.page === this.state.pageCount} style={this.state.page === this.state.pageCount ? styles.btnDisable : styles.btn} onPress={() => this.nextPage()}>
            <Text style={styles.btnText}>{'下一页'}</Text>
          </TouchableHighlight>
        </View>
        <Pdf ref={(pdf) => {this.pdf = pdf;}}
             source={source}
             page={1}
             scale={1}
             horizontal={false}
             onLoadComplete={(pageCount) => {
               this.setState({pageCount: pageCount});
               console.log(`total page count: ${pageCount}`);
             }}
             onPageChanged={(page) => {
               this.setState({page: page});
               console.log(`current page: ${page}`);
             }}
             onError={(error) => {
               console.log(error);
             }}
             style={styles.pdf}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  btn: {
    margin: 5,
    padding: 5,
    backgroundColor: 'blue'
  },
  btnDisable: {
    margin: 5,
    padding: 5,
    backgroundColor: 'gray'
  },
  btnText: {
    color: '#FFF'
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width
  }
});

export default PDFView;
