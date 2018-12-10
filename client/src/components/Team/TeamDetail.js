import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'react-google-charts';
import * as actions from '../../actions';
import PlayerDetail from '../Player/PlayerDetail';
import TrivialCard from '../Trivial/TrivialCard';
import _ from 'lodash';
import '../../Styles/team.css';
class TeamDetail extends Component {
    state = {showDetail: false};
    render() {
        if(this.state.showDetail) {
            return (
                <div>
                    <button className = 'btn btn-outline-secondary' onClick = {()=>this.setState({ showDetail: false })}>Back</button>
                    <PlayerDetail />
                </div>
            )
        }
        if(this.props.teamDetail.length > 0) {
            return (
                <div>
                    <div className = 'teamStats'>
                        <h3 className = 'detailTeamName'>{this.props.teamDetail[0].TEAM_NAME}</h3>
                        {/* <Link to='/' className = 'btn btn-outline-secondary'>Back</Link> */}
                    </div>
                    <div className = 'row'>
                        <div className = 'col-11'>
                            {this.renderTeamDetail()}
                            {this.drawChart()}
                        </div>
                        <div className = 'col-1'>
                            <TrivialCard  />
                        </div>
                    </div>
                    
                    <div>
                    {this.renderPlayerDetail()}
                    </div>
                </div>
            )

        }
        return ""
    }

    renderTeamDetail() {
        if(this.props.teamDetail.length > 0) {
            console.log(this.props.teamDetail);
            const val = {

                property:'W',
                teamName: this.props.teamDetail[0].TEAM_NAME
            }

            const propertyFields = [
                'W', 'L', 'W_PCT','PTS', 'FG_PCT', 'REB', 'AST'
            ]

            const buttonStyle = {display:"inline"};

            return (
                _.map(propertyFields, field =>{
                    // const curField = {property:"PTS"};
                    return(
                        <p style = {buttonStyle} className = 'col-sm-5'>
                            {/* <div className = 'col-sm-4'> */}
                            <button style = {buttonStyle} className = 'btn btn-primary col-sm-4 detailButton' 
                                    value = {field} key={field} onClick = {() =>{
                                    val.property = field;
                                    this.props.drawTeamCharts(val)
                            }
                            }>{field} on average is : {this.renderAverage(field)}</button>
                            
                         {/* </div> */}
                        </p>
                    )
                }
                )    
            )
        }
    }

    renderAverage(field){
        const teamStats = this.props.teamDetail[0];
        switch (field){
            case 'W':
            return teamStats.avrage_win
            case 'AST':
            return teamStats.average_ast
            case 'REB':
            return teamStats.average_REB
            case 'L':
            return teamStats.average_loss
            case 'FG_PCT':
            return teamStats.average_FGPCT
            case 'W_PCT':
            return teamStats.average_WPCT
            case 'PTS':
            return teamStats.average_pts
            default:
            return "";          
        }     
    }

    drawChart() {
        if(this.props.teamChart.length > 0) {
            const data = [["year", "stats"]];
            _.map(this.props.teamChart, stats => {
                data.push([stats.year,stats.W||stats.L||stats.W_PCT||stats.PTS||stats.FG_PCT||stats.REB||stats.AST]);
            })
            const options = {
                hAxis: {
                    title:'year',
                    format:'####'
                },
                vAxis: {
                    title:'stats'
                },
                curveType:'function'
                       
            }
            return(
                <div className = 'container lineGraph'>
                    <Chart 
                    chartType = 'LineChart'
                    data = {data}
                    height = '300px'
                    options = {options}
                    lineWidth = '10'
                    // legendToggle
                    />
                </div>
            )
        }
        return ""
    }

    renderPlayerDetail() {
        if(this.props.teamPlayer.length > 0) {
            return this.props.teamPlayer.map((element) => {
                return (
                    <div key={element.PLAYER} className="card-body needInline card">
                        <button className="card-title" 
                                onClick = {()=>{
                                    console.log(element.PLAYER);
                                    this.setState({showDetail: true});
                                    this.props.fetchPlayerDetail(element.PLAYER);

                                }}>
                            {element.PLAYER}
                        </button>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">year: {element.year}</li>
                            <li className="list-group-item">PTS: {element.PTS}</li>
                            <li className="list-group-item">REB: {element.REB}</li>
                            <li className="list-group-item">AST: {element.AST}</li>
                            <li className="list-group-item">MIN: {element.MIN}</li>
                        </ul>
                    </div>
                )
            })
        }
    }

}
function mapStateToProps(state){
    console.log("map state in team detail");
    console.log(state);
    return {
        teamDetail: state.teamDetail,
        teamPlayer: state.teamPlayer,
        teamChart: state.teamChart
    } 
    
}
export default connect(mapStateToProps,actions)(TeamDetail)