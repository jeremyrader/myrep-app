import React, { Component } from 'react'
import axios from 'axios'
import './App.scss'

class App extends Component {

	state = {
		type: null,
		usState: null,
		records: null,
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.type && this.state.usState && (this.state.type !== prevState.type || this.state.usState !== prevState.usState)) {
			axios.get(`http://localhost:3000/${this.state.type}/${this.state.usState}`).then(res => {
				this.setState({ records: res.data.results })
			})
		}
	}

	render() {
        return (
			<div>
				<form>
					<select
						className="uk-select"
						onChange={ (e) => { this.setState({ type: e.target.value }) } }
					>
						<option>Choose one...</option>
						<option value="senators">Senator</option>
						<option value="representatives">Representative</option>
					</select>
					<select
						className="uk-select"
						onChange={ (e) => { this.setState({ usState: e.target.value }) } }
					>
						<option>Choose one...</option>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District Of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>
				</form>
				<table className="uk-table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Party</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.records ? this.state.records.map((record, idx) => {
								return (
									<tr key={idx}>
										<td>{record.name}</td>
										<td>{record.party}</td>
									</tr>
								)
							}) : null
						}
					</tbody>
				</table>
			</div>
        )
    }
}

export default App
