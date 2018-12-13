import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PlayerDetail from '../Player/PlayerDetail';

class FantasyTeamResult extends Component {
	renderFormResult(){
		return(
			<div>
				<div>
					<div><strong>{this.props.formValues.Player1}</strong></div>
					<div>Defense: {this.props.fTeam[0].Defense}</div>
					<div>PostScoring: {this.props.fTeam[0].PostScoring}</div>
					<div>Midrange: {this.props.fTeam[0].Midrange}</div>
					<div>Rebound: {this.props.fTeam[0].Rebound}</div>

					<br />
					<div><strong>{this.props.formValues.Player2}</strong></div>
					<div>Defense: {this.props.fTeam[1].Defense}</div>
					<div>PostScoring: {this.props.fTeam[1].PostScoring}</div>
					<div>Midrange: {this.props.fTeam[1].Midrange}</div>
					<div>Rebound: {this.props.fTeam[1].Rebound}</div>

					<br />
					<div><strong>{this.props.formValues.Player3}</strong></div>
					<div>Defense: {this.props.fTeam[2].Defense}</div>
					<div>PostScoring: {this.props.fTeam[2].PostScoring}</div>
					<div>Midrange: {this.props.fTeam[2].Midrange}</div>
					<div>Rebound: {this.props.fTeam[2].Rebound}</div>

					<br />
					<div><strong>{this.props.formValues.Player4}</strong></div>
					<div>Defense: {this.props.fTeam[3].Defense}</div>
					<div>PostScoring: {this.props.fTeam[3].PostScoring}</div>
					<div>Midrange: {this.props.fTeam[3].Midrange}</div>
					<div>Rebound: {this.props.fTeam[3].Rebound}</div>

					<br />
					<div><strong>{this.props.formValues.Player5}</strong></div>
					<div>Defense: {this.props.fTeam[4].Defense}</div>
					<div>PostScoring: {this.props.fTeam[4].PostScoring}</div>
					<div>Midrange: {this.props.fTeam[4].Midrange}</div>
					<div>Rebound: {this.props.fTeam[4].Rebound}</div>
				</div>
		</div>
		);
	}
	render(){
		if(this.props.fTeam!==null && this.props.fTeam.length==5){
			const totalSalary = this.props.fTeam[0].salary + this.props.fTeam[1].salary + this.props.fTeam[2].salary + this.props.fTeam[3].salary + this.props.fTeam[4].salary;
			if(totalSalary > 100000000){
				return(
					<div>
						{this.renderFormResult()}
						<h3>Total Salary: {(totalSalary/1000000000).toFixed(2)} billion dollars/year</h3>
						<h3>You do not have enough money!!</h3>
						<button className="btn btn-primary"
							onClick={() => this.props.onCancel()}
						>
						Play Again
					</button>
					</div>
				);
			}
			const averageDefense = (this.props.fTeam[0].Defense + this.props.fTeam[1].Defense + this.props.fTeam[2].Defense + this.props.fTeam[3].Defense + this.props.fTeam[4].Defense)/5;

			const postScoring = (this.props.fTeam[0].PostScoring + this.props.fTeam[1].PostScoring + this.props.fTeam[2].PostScoring + this.props.fTeam[3].PostScoring + this.props.fTeam[4].PostScoring)/5;

			const midrange = (this.props.fTeam[0].Midrange + this.props.fTeam[1].Midrange + this.props.fTeam[2].Midrange + this.props.fTeam[3].Midrange + this.props.fTeam[4].Midrange)/5;

			const rebound = (this.props.fTeam[0].Rebound + this.props.fTeam[1].Rebound + this.props.fTeam[2].Rebound + this.props.fTeam[3].Rebound + this.props.fTeam[4].Rebound)/5;

			return(
				<div>
					{this.renderFormResult()}
					<h3>AverageDefense: {averageDefense}</h3>
					<h3>PostScoring: {postScoring}</h3>
					<h3>Midrange: {midrange}</h3>
					<h3>Rebound: {rebound}</h3>
					<button className="btn btn-primary"
						onClick={() => this.props.onCancel()}
					>
						Play Again
					</button>
				</div>
			);
		}
		return <div></div>
	}
}

function mapStatusToProps(state) {
	return {
		formValues: state.fantasyForm.fantasyForm.values,
		fTeam: state.fantasy5Search
	};
}

export default connect(mapStatusToProps)(FantasyTeamResult);