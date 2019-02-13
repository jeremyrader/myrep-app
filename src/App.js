import React, { Component } from 'react'
import axios from 'axios'
import './App.scss'

class App extends Component {

	state = {
		type: null,
		usState: null,
		records: null,
		selectedRecord: null
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.type !== prevState.type || this.state.usState !== prevState.usState) {
			
			this.setState({ selectedRecord: null })

			if (this.state.type && this.state.usState) {
				axios.get(`http://localhost:3000/${this.state.type}/${this.state.usState}`).then(res => {
					this.setState({ records: res.data.results })
				})
				.catch(err => {
					if (err) {
						window.UIkit.notification({
							message: "Sorry! We weren't able to get the results. Please try again later",
							status: 'danger'
						});
					}
				})
			}
		}
	}

	render() {
        return (
			<div data-uk-grid className="uk-flex uk-flex-column uk-width-2-3 uk-align-center uk-padding">
				<h1 className="uk-text-capitalize uk-align-center">Who is my representative?</h1>
				<div className="uk-card uk-card-default uk-padding uk-align-center">
					<form className="uk-flex uk-flex-row">
						<div>
							<label>Senators/Representatives</label>
							<div className="uk-form-controls">
								<select
									className="uk-select"
									onChange={ (e) => { this.setState({ type: e.target.value }) } }
								>
									<option>Choose one...</option>
									<option value="senators">Senators</option>
									<option value="representatives">Representatives</option>
								</select>
							</div>
						</div>
						<div  className="uk-margin-left">
							<label>State</label>
							<div className="uk-form-controls">
								<select
									className="uk-select uk-form-width-small"
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
							</div>
						</div>
					</form>
				</div>
				{
					this.state.records ? (
						<div className="uk-card uk-card-default uk-padding uk-align-center">
							<div className="uk-flex uk-flex-row">
								<table className="uk-table uk-overflow-auto list">
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
													<tr 
														key={idx}
														className={this.state.selectedRecord && record.name === this.state.selectedRecord.name ? 'gray' : ''}
														onClick={ (e) => { this.setState({ selectedRecord: record }) } } >
														<td>
															{record.name}
														</td>
														<td>
															<span className={`uk-label ${record.party === 'Democrat' ? 'democrat' : 'republican'}`}>{record.party}</span>
														</td>
													</tr>
												)
											}) : null
										}
									</tbody>
								</table>
								{
									this.state.selectedRecord ? (
										<table className="uk-margin-left uk-margin-top">
											<tbody>
												<tr>
													<td><b>District</b></td>
													<td>{this.state.selectedRecord.district}</td>
												</tr>
												<tr>
													<td><b>Phone</b></td>
													<td>{this.state.selectedRecord.phone}</td>
												</tr>
												<tr>
													<td><b>Office</b></td>
													<td>{this.state.selectedRecord.office}</td>
												</tr>
												<tr>
													<td><a href={this.state.selectedRecord.link}>Website</a></td>
												</tr>
											</tbody>
										</table>
									) : null
								}
							</div>
						</div>
					) : null
				}
			</div>
        )
    }
}

export default App
