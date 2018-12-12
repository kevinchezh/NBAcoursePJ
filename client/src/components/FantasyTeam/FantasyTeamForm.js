import React, {Component} from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';
import PlayerDetail from '../Player/PlayerDetail';

class FantasyTeamForm extends Component {
	state = {
		showPlayer: false
	};
	renderSearchResult(){
        // console.log("renderSearchResult")
        // console.log(this.props.player);
        if(this.props.rating!==null&&this.props.rating.length!=0){
            const oneRow = this.props.rating[0];
            return (
                    
                    <div key = 'f' className=" searchResult needInline card" >
                       
                        <div> {this.props.rating[0].Player}</div>
                        <ul className="list-group list-group-flush searchCardList">
                        	<li className="list-group-item searchCardItem">salary: {oneRow.salary}</li>
                            <li className="list-group-item searchCardItem">Speed: {oneRow.Speed}</li>
                            <li className="list-group-item searchCardItem">Dribble: {oneRow.Dribble}</li>
                            <li className="list-group-item searchCardItem">Finishing: {oneRow.Finishing}</li>
                            <li className="list-group-item searchCardItem">3PT: {oneRow.three_shooting}</li>
                            <li className="list-group-item searchCardItem">PostScoring: {oneRow.PostScoring}</li>
                            <li className="list-group-item searchCardItem">Rebound: {oneRow.Rebound}</li>
                            <li className="list-group-item searchCardItem">Defense: {oneRow.Defense}</li>
                            <li className="list-group-item searchCardItem">Midrange: {oneRow.Midrange}</li>
                        </ul>
                    </div>
                )
      
        }
    }
	renderContent(){
		return(
		<div>
			<br />
			<h2>You have 1 billion dollars/year</h2>
			<br />
			<form className=" searchResult needInline card"
				onSubmit={
					this.props.handleSubmit(
						(values) => {
							this.props.onSurveySubmit();
							this.props.fetchPlayerForFiveFantasy(values);
						}
					)
				}
			>


  				Player1:<br />
  				<Field type="text" name="Player1" component="input" required /><br />
  				Player2:<br />
	  			<Field type="text" name="Player2" component="input" required /><br />
	  			Player3:<br />
  				<Field type="text" name="Player3" component="input" required /><br />
  				Player4:<br />
  				<Field type="text" name="Player4" component="input" required /><br />
  				Player5:<br />
  				<Field type="text" name="Player5" component="input" required /><br />
  				<input type="submit" value="have a try!" className="btn btn-primary"/>
			</form>
			<br />
			<br />


			<form className=" searchResult needInline card"
				onSubmit={
					this.props.handleSubmit(
						(values) => {
							this.setState({showPlayer: true});
						}
					)
				}
			>
				<strong>Query a player's Rating and Salary:</strong>
				<br />
				<Field type="text" name="Player" component="input" required /><br />
				<input type="submit" value="Query" className="btn btn-info"/>
			</form>
			<br />
		</div>
		);
	}
	render(){
		if(this.state.showPlayer){
			return(
				<div>
					{this.renderContent()}
					{this.renderSearchResult()}
				</div>
			);
		}
		else {
			return(
				<div>
					{this.renderContent()}
				</div>
			);
		}
	}
}
function mapStateToProps(state) {
	return{
		rating:state.fantasySearch
	}
}

FantasyTeamForm = connect(mapStateToProps, actions)(FantasyTeamForm);
export default reduxForm(
 {
     form: 'fantasyForm',
     destroyOnUnmount: false,
     onSubmitSuccess: (value,dispatch, props) => {      
         dispatch(actions.fetchPlayerForFantasy(props.values.Player));
     }
}
)(FantasyTeamForm);

// export default reduxForm({
// 	form: 'fantasyForm',
// 	destroyOnUnmount: false
// })(FantasyTeamForm);