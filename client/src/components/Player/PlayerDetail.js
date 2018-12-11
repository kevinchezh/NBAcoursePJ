import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'react-google-charts';
import * as actions from '../../actions';
import _ from 'lodash';

import '../../Styles/player.css';
import TrivialCard from '../Trivial/TrivialCard';
class PlayerDetail extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { season: '' };
      }

    componentDidUpdate(prevProps,prevState){
        // console.log("update did ");
        // console.log(prevProps)
        // console.log(prevState)
        // console.log(this.state.season);
        if(this.state.season !== prevState.season){
            const value = {playerName:this.props.playerDetail[0].PLAYER,
                season:this.state.season};
            return this.props.fetchPlayer(value);
        }
        
    }
    drawChart(){

        if(this.props.playerChartData.length>0){
            const data = [["year", "stats"]];
            _.map(this.props.playerChartData, stats => {
                data.push([stats.year,stats.PTS||stats.REB||stats.AST||stats.STL||stats.BLK||stats.FG_PCT||stats.FG3_PCT]);
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
    renderStats(){

      //could be value instead of val in master
        const val = {

            property:'PTS',
            playerName: this.props.playerDetail[0].PLAYER
        }
        const propertyFields = [
            'PTS', 'REB', 'AST', 'STL','BLK','FG_PCT','FG3_PCT'
        ]
        const buttonStyle = {display:"inline"};
        return(
            _.map(propertyFields, feild =>{
                // const curField = {property:"PTS"};
                return(
                    <p style = {buttonStyle} className = 'col-sm-5'>
                        {/* <div className = 'col-sm-4'> */}
                        <button style = {buttonStyle} className = 'btn btn-primary col-sm-4 detailButton' value = {feild} onClick = {() =>{
                                val.property = feild;
                                this.props.drawCharts(val)
                        }
                        }>{feild} on average is : {this.renderAverage(feild)} </button>
                        
                     {/* </div> */}
                    </p>
                )
            }
            )    
        )     
    }
    renderAverage(feild){
        const playerStats = this.props.playerDetail[0];
        switch (feild){
            case 'PTS':
            return playerStats.PTS
            case 'AST':
            return playerStats.AST
            case 'REB':
            return playerStats.REB
            case 'STL':
            return playerStats.STL
            case 'FG_PCT':
            return playerStats.FG_PCT
            case 'FG3_PCT':
            return playerStats.FG3_PCT
            case 'BLK':
            return playerStats.BLK
            default:
            return "";          
        }     
    }
    renderYearStats(){
        if(this.state.season === '') return '';
        if(this.props.player.length>0){
            // console.log("inside map");
            return this.props.player.map(oneRow => {
                return (
                        <div className='yearStatsBlock' key = {oneRow.PLAYER_ID + oneRow.year} >
                            <div className='row yearStatsRow'>
                            <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">Year</label>
                                        <li className="list-group-item yearStats"> {oneRow.year}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">Season</label>
                                        <li className="list-group-item yearStats"> {this.state.season}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">Team</label>
                                        <li className="list-group-item yearStats"> {oneRow.TEAM}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">MIN</label>
                                        <li className="list-group-item yearStats"> {oneRow.MIN}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">PTS</label>
                                        <li className="list-group-item yearStats"> {oneRow.PTS}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">FG-PCT</label>
                                        <li className="list-group-item yearStats"> {oneRow.FG_PCT}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">FG3_PCT</label>
                                        <li className="list-group-item yearStats"> {oneRow.FG3_PCT}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">AST</label>
                                        <li className="list-group-item yearStats"> {oneRow.AST}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats' >
                                        <label for="user_title">REB</label>
                                        <li className="list-group-item yearStats" > {oneRow.REB}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">STL</label>
                                        <li className="list-group-item yearStats"> {oneRow.STL}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">BLK</label>
                                        <li className="list-group-item yearStats"> {oneRow.BLK}</li>
                                    </div>
                                </div>
                                <div className='col-sm-1'>    
                                    <div className='form-group yearStats'>
                                        <label for="user_title">TOV</label>
                                        <li className="list-group-item yearStats"> {oneRow.TOV}</li>
                                    </div>
                                </div>
                                
                            </div>       
                        </div>
                )
            })
        }
    }
    render(){
        
        if(this.props.playerDetail.length>0){
            return(
                <div>
                    <div className = 'playerStats'>
                        <h3 className = 'detailPlayerName'>{this.props.playerDetail[0].PLAYER}</h3>
                        {/* <Link to='/' className = 'btn btn-outline-secondary'>Back</Link> */}
                        {/* <button className = 'btn btn-outline-secondary' onClick = {()=>this.setState({ season: '' })}>Back</button> */}
                    </div>
                    <div className='row'>
                        
                        <div className = 'container col-8'>
                    
                       
                        <div>
                            {this.renderStats()}
                        </div>
                        <div>
                            {this.drawChart()}
                        </div>
                        </div>
                        <div className='col-4'>
                            <TrivialCard />
                        </div>
                        
                    </div>
                    <div className = 'showStatsDiv'>
                            <button onClick = {()=>this.setState({season:'reg'})} className = 'btn-outline-primary showStatsButton'>Show regular stats</button>
                            <button onClick = {()=>this.setState({season:'post'})} className = 'btn-outline-primary showStatsButton'>Show post stats </button>
                        </div>
                        
                        <div>
                            {this.renderYearStats()}
                        </div>
                </div>
                
                
            )
        }
        return ""
        
    }
    setSeason(season,val){
        season = val
        return season;
    }
}
function mapStateToProps(state){
    return {
        player:state.player,
        playerDetail: state.playerDetail,
        playerChartData: state.playerChartData
        // trivial: state.trivial
    } 
    
}
export default connect(mapStateToProps,actions)(PlayerDetail)
