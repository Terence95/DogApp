/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, ViewPropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image
} from 'react-native';

export default class Doggie extends Component {
  // 构造
  constructor(props) {
    super(props);
    // let  ds = ListView.dataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    // let lvData = ds.cloneWithRows(this.state.data);
    // 初始状态
    this.state = {
      data: null,
    };

    this.fetchData = this.fetchData.bind(this);


  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('http://www.imooc.com/api/teacher?type=4&num=30')
        .then((response) => response.json())
        .then((jsonData) => {
          this.setState({
            data: new ListView.DataSource({rowHasChanged: (r1,r2) => r1!==r2 }).cloneWithRows(jsonData.data),
          });
        })
        .catch((error) => {
          alert(error);
        });
  }

  renderRow (rowData) {
    return(
        <View>
          <Image style={styles.img} source={{uri:rowData.picBig}}/>
          <View>
            <Text>
              {rowData.name}
            </Text>
          </View>
        </View>
    )
  }

  render() {
    if (!this.state.data) {
      return (
          <Text style={styles.loading}>Loading...</Text>
      )
    } else {
      return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <View style={styles.content}>
              <ListView
                  dataSource={this.state.data}
                  renderRow={(rowData)=>this.renderRow(rowData)}
              />
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin:20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  content: {
    flex:1,
    backgroundColor:"#c5def5",
    borderColor: "#ccc",
    alignItems:'flex-end'
  },
  loading: {
    textAlign:'center',
    // flex:'center'
    justifyContent:'center',
    alignItems:'flex-end'

  },
  img: {
    height:40,
    width: 80
  }
});

AppRegistry.registerComponent('Doggie', () => Doggie);
