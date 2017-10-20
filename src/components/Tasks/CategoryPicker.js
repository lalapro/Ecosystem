import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button } from 'react-native';
import axios from 'axios';

class CategoryPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			newCategory: '',
			category: 'Attach a Category',
			newCategory: '',
			created: '',
			userID: '',
			categoryID: '',
			isEdit: false
		}
		this.newCategory = this.newCategory.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
	}

  //axios.get for existing categories
  componentWillMount() {
    //give axios user id and get category names
		console.log('mounting')
		this.grabCategories()
  }

	componentDidMount() {
		console.log('DID MOUNT')
	}

	grabCategories(specific) {
		axios.get('http://10.16.1.152:3000/categories', {params: {userID: this.props.userID}})
			.then((response) => {
				let categories = response.data;
				console.log('AM I BEING CALLED HERE?')
				this.setState({
					categories: categories,
					category: categories[0].ID
				})
				console.log('state has been set ...', this.state.category)
				if (specific) {

					for(let i = 0; i < categories.length; i++) {
						console.log('loop loop', categories[i])
						if (categories[i].Category === specific) {
							console.log('should set to cuirse', categories[i])
							this.setState({
								category: categories[i].ID
							})
							console.log('ID should show', categories[i].ID)
							this.changeCategory(categories[i].ID);
						}
					}
				}
			})
			.catch((err) => {console.error(err)})
	}

//axios.get for existing categories
	componentWillReceiveProps(oldone) {
		console.log('receiving props... CATEGORIES was here', oldone)
    if (oldone.task.Category_ID && !this.state.isEdit) {
			// console.log('receiving props', oldone)
      this.setState({
        category: oldone.task.Category_ID,
        isEdit: true
      })
    }
	}

	changeCategory(category) {
		console.log('called.....', category)
		this.setState({category})
		this.props.onSelect(category);
	}

	addCategory(category) {
		this.setState({
			newCategory: category
		})
	}

  newCategory() {
    let category = this.state.newCategory;
		if (category.length > 1) {
			axios.post('http://10.16.1.152:3000/categories', {category, userID: this.props.userID})
			.then(response => {
				console.log(`save category ${response}`)
				this.grabCategories(category)
				this.setState({ newCategory: '' })
			})
			.catch((err) => {
				console.error(err)
			})
		}
	}


	render() {
		console.log('before render', this.state.category)
		return(
			<View style={StyleSheet.picker}>
				<Picker
					style={[styles.onePicker]} itemStyle={styles.onePickerItem}
					selectedValue={this.state.category}
					onValueChange={value => this.changeCategory(value)}
				>
			 	{this.state.categories ?
						this.state.categories.map((category, i) => {
							return (
								<Picker.Item key={i} label={category.Category} value={category.ID} />
							)
						}) : ''
				}
				</Picker>
				<TextInput
					onChangeText={this.addCategory.bind(this)}
					value={this.state.newCategory}
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
		height: 88,
	},
	onePickerItem: {
		height: 88,
		color: '#8A7D80'
	}
});

export default CategoryPicker;
