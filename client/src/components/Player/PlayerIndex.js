

//player root page, show player search component.
import React, {Component}  from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import PlayerForm from './PlayerForm';
import PlayerDetail from './PlayerDetail';
import PlayerCompare from './PlayerCompare';
import {Chart} from 'react-google-charts';
class PlayerIndex extends Component {
    state = {showDetail: false};
    render(){
        if(this.state.showDetail){
            return (
                <div>
                    {/* <Route path = "/player/detail" component={PlayerDetail} /> */}
                    <PlayerDetail />   
                </div>                       
            )      
        }
        return (
            <div>
                <PlayerForm />
                {this.renderSearchResult()}
                <PlayerCompare />
                {this.renderPlayerCompare()}
            </div>
        )
    }
    onClickHandler(PLAYER){
        this.setState({showDetail:true});
        this.props.showTrivialDetail(false);
        this.props.fetchPlayerDetail(PLAYER);
    }
    renderPlayerCompare(){
        if(this.props.compare.length>0){
            console.log(this.props.compare[0][0]);
            var one = this.props.compare[0][0];
            var two = this.props.compare[1][0];
            console.log(two);
            var data = [
                ['Player',one.PLAYER,{ role: 'annotation' }, two.PLAYER,{ role: 'annotation' }],
                ['PTS', one.PTS, one.PTS, two.PTS, two.PTS],
                ['AST', one.AST, one.AST, two.AST, two.AST],
                ['REB', one.REB, one.REB, two.REB, two.REB],
                ['STL', one.STL, one.STL, two.STL, two.STL],
                ['BLK', one.BLK, one.BLK, two.BLK, two.BLK],
                ['FG_PCT', one.FG_PCT, one.FG_PCT, two.FG_PCT, two.FG_PCT],
                ['FG3_PCT', one.FG3_PCT, one.FG3_PCT, two.FG3_PCT, two.FG3_PCT],
            ];
        
              var options = {
                width: 600,
                height: 400,
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' },
                isStacked: "percent"
              };
              return(
                <div className = 'container'>
                    <Chart 
                    chartType = 'BarChart'
                    data = {data}
                    height = '300px'
                    options = {options}
                    legendToggle
                    />
                    
                </div>
            )
        }
        
    }
    renderSearchResult(){
        // console.log("renderSearchResult")
        // console.log(this.props.player);
        if(this.props.player.length>0 && this.props.player.length<1000){
            // console.log("inside map");
            return this.props.player.map(oneRow => {
                return (
                    
                        <div key = {oneRow.PLAYER_ID + oneRow.year} className="card" >
                            {/* <img className="card-img-top" src="https://kodi.tv/sites/default/files/styles/medium_crop/public/addon_assets/plugin.video.nba/icon/icon.png?itok=UANlCIrN" alt="Card image cap"></img> */}
                            <div className="card-body">
                                <button className="card-title" onClick = {()=>this.onClickHandler(oneRow.PLAYER)}>{oneRow.PLAYER}</button>
                                {/* <p className="card-text"></p> */}
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">year: {oneRow.year}</li>
                                <li className="list-group-item">PTS: {oneRow.PTS}</li>
                                <li className="list-group-item">REB: {oneRow.REB}</li>
                                <li className="list-group-item">AST: {oneRow.AST}</li>
                                <li className="list-group-item">STL: {oneRow.STL}</li>
                            </ul>
                            {/* <div className="card-body">
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div> */}
                        </div>
                    
                )
            })
        }
    }
}
function mapStateToProps(state){
    // console.log("state player");
    // console.log(state.player);
    return {
        player: state.player,
        showTrivialDetail:state.showTrivialDetail,
        compare: state.playerCompare
    }
}
export default connect(mapStateToProps,actions)(PlayerIndex);
