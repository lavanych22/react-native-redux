import React from "react";
import {FlatList, View, Text} from 'react-native'
import {Tile} from "react-native-elements"
import DishDetail from "./DichDetail";
import {baseUrl} from "../shared/baseUrl";
import {connect} from "react-redux";
import {Loading} from "./Loading";

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

class Menu extends React.Component {

  static navigationOptions = {
      title: 'Menu'
  };

  render() {
      const {navigate} = this.props.navigation;

      const renderMenuItem = ({item, index}) => {
          return (
              <Tile
                  key={index}
                  title={item.name}
                  caption={item.description}
                  featured
                  imageSrc={{ uri: baseUrl + item.image }}
                  onPress={() => navigate('DishDetail', {dishId: item.id})}
              />
          )
      };

      if (this.props.dishes.isLoading) {
          return <Loading />
      } else if (this.props.dishes.errMess) {
          return (
              <View>
                  <Text>{this.props.dishes.errMess}</Text>
              </View>
          )
      } else {
          return (
              <FlatList
                  data={this.props.dishes.dishes}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id.toString()}
              />
          )
      }
  }
}

export default connect(mapStateToProps)(Menu)
