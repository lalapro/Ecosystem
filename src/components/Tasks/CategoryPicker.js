import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button, TouchableHighlight } from 'react-native';
import axios from 'axios';
import ColorPicker from './ColorPicker.js';

class CategoryPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			newCategory: '',
			category: 'Attach a Category',
			created: '',
			userID: '',
			categoryID: '',
			isEdit: false, 
			color: null
		}
		this.newCategory = this.newCategory.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.selectColor = this.selectColor.bind(this);
	}

  //axios.get for existing categories
  componentWillMount() {
    //give axios user id and get category names
    axios.get('http://10.16.1.218:3000/categories', {params: {userID: this.props.userID}})
      .then((response) => {
				let categories = response.data;
				this.setState({categories})
				this.props.onSelect(categories[0].ID);
      })
      .catch((err) => {console.error(err)})
  }

//axios.get for existing categories
	componentWillReceiveProps(oldone) {
		// console.log('receiving props... CATEGORIES was here', oldone)
    if (oldone.task.Category_ID && !this.state.isEdit) {
			// console.log(oldone)
      this.setState({
        category: oldone.task.Category_ID,
        isEdit: true
      })
    }
	}

	changeCategory(category) {
		this.setState({category});
		this.props.onSelect(Number(category));
	}

	selectColor(color) {
		this.setState({color});
		// this.props.onSelectColor(color);
	}

  newCategory() {
		let category = this.state.category;
		let color = this.state.color;
		if (category) {
			axios.post('http://10.16.1.218:3000/categories', {category, color, userID: this.props.userID})
			.then((response) => {
				console.log(`save category ${response}`)
			})
			.catch((err) => {
				console.error(err)
			})
		}
		}


	render() {
		return(
			<View style={StyleSheet.picker}>
				<Picker
					style={[styles.onePicker]} itemStyle={styles.onePickerItem}
					selectedValue={this.state.category}
					onValueChange={value => this.changeCategory(value)}
				>
			 	{this.state.categories ?
						this.state.categories.map((category, i) => {
							let val = '' + category.ID;
							return (
								<Picker.Item key={i} style={{borderColor: category.Color}} label={category.Category} value={val} />
							)
						}) : ''
					}
				</Picker>
				{this.state.color ? <TouchableHighlight style={{backgroundColor: this.state.color, margin: 10, width: 30, height: 30, borderRadius: 30}}><View></View></TouchableHighlight> : null}
				<TextInput
					onChangeText={this.changeCategory}
					placeholder="Create a new category"
				/>
				<ColorPicker
					selectColor={this.selectColor} color={this.state.color}
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
		height: 88,
	},
	onePickerItem: {
		height: 88,
		color: '#8A7D80'
	}
});

export default CategoryPicker;
