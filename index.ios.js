/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, ViewPropTypes} from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TabBarIOS
} from 'react-native';

let base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

/**
 * 子组件
 */
class Son extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name: 'Terence',
            selectedTab: 'blueTab'
        };
    }

    _renderContent(color, pageText, num) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
            </View>
        );
    }

    render() {
        return (
            <TabBarIOS
                tintColor="#ee7354">
                <Icon.TabBarItem
                    title="发现"
                    systemIcon="history"
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
                    {this._renderContent('#fff', 'first')}
                </Icon.TabBarItem>
                <TabBarIOS.Item
                    systemIcon="history"
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
                    {this._renderContent('#fff', 'middle', this.state.notifCount)}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="end"
                    icon={{uri: base64Icon, scale: 3}}
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
                    {this._renderContent('#fff', 'last', this.state.presses)}
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

/**
 * 主要的父组件
 */
export default class Doggie extends Component {
    // 构造
    constructor(props) {
        super(props);
        // let  ds = ListView.dataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        // let lvData = ds.cloneWithRows(this.state.data);
        // 初始状态
        this.state = {
            data: null,
            times: 0
        };

        this.fetchData = this.fetchData.bind(this);


    }

    componentDidMount() {
        // this.fetchData();
    }

    fetchData() {
        fetch('http://www.imooc.com/api/teacher?type=4&num=30')
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({
                    data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(jsonData.data),
                    pageText: "aaa"
                });
            })
            .catch((error) => {
                alert(error);
            });
    }


    _renderContent(color, pageText, num) {
        return (
            <View style={styles.tabContent}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
            </View>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <Son/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        // margin: 20
    },
    content: {
        flex: 1,
        backgroundColor: "#c5def5",
        borderColor: "#ccc",
        alignItems: 'flex-end'
    },
    loading: {
        textAlign: 'center',
        // flex:'center'
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    img: {
        height: 40,
        width: 80
    },
    tabText: {
        flex: 1,
        textAlign: 'center',
        margin: 20
    },
    tabContent: {
        flex: 1,
    }
});

AppRegistry.registerComponent('Doggie', () => Doggie);
