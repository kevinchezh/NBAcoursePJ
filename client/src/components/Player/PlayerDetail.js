import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'react-google-charts';
import * as actions from '../../actions';
import _ from 'lodash';
class PlayerDetail extends Component {
    // setDrawProperty(buttonVal){
    //     const value = {
    //         property:buttonVal,
    //         playerName: this.props.playerDetail[0].PLAYER
    //     }
    //     return value;

    // }
    drawChart(){
        console.log("draw chart");
        console.log(this.props.playerChartData)
        if(this.props.playerChartData.length>0){
            const data = [["year", "stats"]];
            _.map(this.props.playerChartData, stats => {
                data.push([stats.year,stats.PTS||stats.REB||stats.AST||stats.STL||stats.BLK||stats.FG_PCT||stats.FG3_PCT]);
            })
            console.log(data);
            const options = {
                title: "Line chart for players' stats",
                hAxis: {
                    title:'year'
                },
                vAxis: {
                    title:'number'
                }
            
                
            }
            return(
                <div className = 'container'>
                    <Chart 
                    chartType = 'Line'
                    data = {data}
                    height = '300px'
                    options = {options}
                    legendToggle
                    />
                </div>
            )
        }
        return "Loading..."
    }
    renderStats(){
        console.log("renderStats")
        console.log(this.props.playerDetail[0])
        console.log(this.props.playerChartData);
        const val = {
            property:'PTS',
            playerName: this.props.playerDetail[0].PLAYER
        }
        const propertyFields = [
            'PTS', 'REB', 'AST', 'STL','BLK','FG_PCT','FG3_PCT'
        ]
        return(
            _.map(propertyFields, feild =>{
                const curField = {property:"PTS"};
                return(
                    <div>
                        <div>
                        <button className = 'btn btn-primary' value = {feild} onClick = {() =>{
                                val.property = feild;
                                this.props.drawCharts(val)
                        }
                        }>{feild} on average is :  </button>
                        {this.renderAverage(feild)}
                        
                          
                        </div>
                    </div>
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
            
        }
         
    }
    render(){
        if(this.props.playerDetail.length>0){
            return(
                <div>
                    <div className = 'container'>
                 <div className = 'playerStats'>
                 {this.props.playerDetail[0].PLAYER}
                 </div>
                 </div>
                    <div>
                        {this.renderStats()}
                    </div>
                    <div>
                        {this.drawChart()}
                    </div>
                          
                </div>
                
            )
        }
        return "Loading..."
        
    }
}
function mapStateToProps(state){
    console.log("map state in player detail");
    console.log(state);
    return {
        playerDetail: state.playerDetail,
        playerChartData: state.playerChartData
        // trivial: state.trivial
    } 
    
}
export default connect(mapStateToProps,actions)(PlayerDetail)
