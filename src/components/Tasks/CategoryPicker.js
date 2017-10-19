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
			userID: 2,
			categoryID: ''
		}
		this.newCategory = this.newCategory.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
	}

  //axios.get for existing categories
  componentWillMount() {
    
    //give axios user id and get category names
    axios.get('http://10.16.1.218:3000/categories', {params: {userID: this.props.userID}})
      .then((response) => {
        let categories = response.data;
        this.setState({categories})
      })
      .catch((err) => {console.error(err)})
  }
  
  componentDidMount() {
    setTimeout(() => {
      if(this.props.marker) {
        console.log(this.props, 'props')
        this.setState({category: this.props.category}, () => console.log(this.state))
      }
    }, 800)
  }

//axios.get for existing categories
	componentWillReceiveProps(oldone, newone) {
		setTimeout(() => {this.setState({ categoryID: oldone.task.Category_ID});
			this.state.categories.map(ele => {
				if (ele.ID === this.state.categoryID) {
					this.setState({ category: ele.Category })
				}
			})
		})
	}



	changeCategory(category) {
		this.setState({category});
		this.props.onSelect(category);
	}

  newCategory() {
    let category = this.state.category;
<<<<<<< HEAD
    axios.post('http://10.16.1.218:3000/categories', {category, userID: this.props.userID})
=======
    axios.post('http://10.16.1.218:3000/categories', {category, userID: this.state.userID})
>>>>>>> working on edit functionality, rebasing
      .then((response) => {
        console.log(`save category ${response}`)
      })
      .catch((err) => {
        console.error(err)
      })
<<<<<<< HEAD
		}

	render() {
		return(
			<View style={StyleSheet.picker}>
				<Picker
					style={[styles.onePicker]} itemStyle={styles.onePickerItem}
					selectedValue={this.state.category}
					onValueChange={this.changeCategory}
				>
			{this.state.category ?            
			<Picker.Item label={this.state.category} value={this.state.categoryID}/> : null} 
			 	{this.state.categories ?
						this.state.categories.map((category, i) => {
							return (
								<Picker.Item key={i} label={category.Category} value={category.Category_ID} />
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
=======
  }

  render() {
    return(
      <View style={StyleSheet.picker}>
        <Picker
          style={[styles.onePicker]} itemStyle={styles.onePickerItem}
          placeholder={this.props.placeholder}
          onValueChange={this.changeCategory}
        >
          {this.state.category ? 
            <Picker.Item label={this.state.category} value={this.state.category}/> : null
          } 
          {this.state.categories ?
            this.state.categories.map((category, i) => {
              return (
                <Picker.Item key={i} label={category.Category} value={category.ID} />
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
>>>>>>> working on edit functionality, rebasing
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
		height: 88,
	},
	onePickerItem: {
		height: 88,
		color: '#8A7D80'
	}
});

export default CategoryPicker;
