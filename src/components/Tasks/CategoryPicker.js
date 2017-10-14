import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button } from 'react-native';
import axios from 'axios';

class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      newCategory: '',
      category: '',
      created: '',
    }
    this.newCategory = this.newCategory.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }
  //axios.get for existing categories
  componentWillMount() {
    //give axios user id and get category names
    axios.get('http://10.16.1.152:3000/categories', {params: {username: 'krb'}})
      .then((response) => {
        let arr = response.data;
        let categories = arr.map((row) => {
          return row.Category;
        })
        categories.unshift('none')
        this.setState({categories})
      })
      .catch((err) => {console.error(err)})
  }

  changeCategory(category) {
    this.setState({category});
    this.props.onSelect(category);
  }

  newCategory() {
    let category = this.state.category;
    axios.post('http://10.16.1.152:3000/categories', {category, username: 'krb'})
      .then((response) => {
        console.log(`save category ${response}`)
      })
      .catch((err) => {
        console.error(err)
      })

  }

  render() {
    return(
      <View style={StyleSheet.picker}>
        <Picker
          style={[styles.onePicker]} itemStyle={styles.onePickerItem}
          selectedValue={this.state.category}
          onValueChange={this.changeCategory}
        >
          {this.state.categories ?
            this.state.categories.map((category, i) => {
              return (
                <Picker.Item key={i} label={category} value={category} />
              )
            }) : ''
          }
        </Picker>
        <TextInput
          onChangeText={this.changeCategory}
          placeholder="Create a new category"
        />
        <Button
          onPress={this.newCategory}
          title="Save Category"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 30,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#8A7D80',
    borderColor: '#8A7D80',
    borderWidth: 1
  },
  picker: {
    width: 200,
  },
  pickerItem: {
    color: '#8A7D80'
  },
  onePicker: {
    width: 200,
    height: 44,
  },
  onePickerItem: {
    height: 44,
    color: '#8A7D80'
  }
});

export default CategoryPicker;
