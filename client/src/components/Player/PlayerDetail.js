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
    //     this.props.drawCharts(value)

    // }
    drawChart(){
        console.log("draw chart");
        console.log(this.props.playerChartData)
        if(this.props.playerChartData.length>0){
            const data = [["year", "stats"]];
            _.map(this.props.playerChartData, stats => {
                data.push([stats.year,stats.PTS]);
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
        console.log(this.props.playerDetail[0].PLAYER)
        console.log(this.props.playerChartData);
        const value = {
            property:'PTS',
            playerName: this.props.playerDetail[0].PLAYER
        }
        return(
            <div className = 'container'>
                <div className = 'playerStats'>
                {this.props.playerDetail[0].PLAYER}
                </div>
                <div>
                    <button className = 'btn btn-primary' value = 'PTS' onClick = {()=>this.props.drawCharts(value)}>Points on average is :</button>
                    {this.props.playerDetail[0].average}    
                </div>
            </div>
            
        )
        
        
    }
    render(){
        if(this.props.playerDetail.length>0){
            return(
                <div>
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
    } 
    
}
export default connect(mapStateToProps,actions)(PlayerDetail)
