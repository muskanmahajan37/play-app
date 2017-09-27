import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/styles';

import normalize from './helpers/normalizeText';

// eslint-disable-next-line consistent-return,no-unused-vars
function renderNode(node, index, siblings, parent, defaultRenderer) {
  if (node.name === 'pre') {
    const codeString = node.children[0].children[0].data + '';
    return (
      <View style={styles.container} key={index}>
        <SyntaxHighlighter style={github}>
          {codeString}
        </SyntaxHighlighter>
      </View>
    );
  }
}

class NativeHtmlViewRender extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {html} = this.props;

    return (
        <HTMLView
          value={html}
          style={styles.htmlView}
          stylesheet={styles}
          renderNode={renderNode}
          addLineBreaks={false}
        />
    );
  }
}

const styles = StyleSheet.create({
  pre: {
    padding: 5,
    backgroundColor: '#f8f8f8',
    fontSize: normalize(14)
  },
  code: {
    color: '#444',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    fontSize: normalize(14)
  },
  htmlView: {
    padding: 10,
    backgroundColor: '#fff'
  },
  a: {
    color: '#1abc9c',
    fontSize: normalize(14)
  },
  li: {
    color: '#384452',
    fontSize: normalize(14)
  },
  p: {
    color: '#384452',
    marginTop: 0,
    marginBottom: 0,
    fontSize: normalize(14)
  },
  h1: {fontWeight: '500', fontSize: normalize(24), color: '#384452'},
  h2: {fontWeight: '500', fontSize: normalize(22), color: '#384452'},
  h3: {fontWeight: '500', fontSize: normalize(20), color: '#384452'},
  h4: {fontWeight: '500', fontSize: normalize(18), color: '#384452'},
  h5: {fontWeight: '500', fontSize: normalize(16), color: '#384452'},
  h6: {fontWeight: '500', fontSize: normalize(14), color: '#384452'}
});

export default NativeHtmlViewRender;