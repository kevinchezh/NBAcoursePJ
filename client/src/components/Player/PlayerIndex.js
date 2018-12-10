

//player root page, show player search component.
import React, {Component}  from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import PlayerForm from './PlayerForm';
import PlayerDetail from './PlayerDetail';
import PlayerCompare from './PlayerCompare';
import {Chart} from 'react-google-charts';
import '../../Styles/player.css';
import TrivialCard from '../Trivial/TrivialCard';
class PlayerIndex extends Component {
    state = {showDetail: false};
    render(){
        if(this.state.showDetail){
            return (
                <div className='showDetail'>
                    {/* <Route path = "/player/detail" component={PlayerDetail} /> */}
                    <button className = 'btn btn-outline-secondary' onClick = {()=>this.setState({ showDetail: false })}>Back</button>
                    <PlayerDetail />   
                </div>                       
            )      
        }
        return (

            <div >
                <div className='playerFormTitle'>Player Search</div>
                <div className='PlayerIndex row'>
                    
                    <div className='playerForm col-4'>
                        <PlayerForm />
                        
                    </div>
                    <div className='playerCompare col-4'>
                    <PlayerCompare />
                    {this.renderPlayerCompare()}
                    </div>
                    <div className = 'col-3'>
                        <TrivialCard  />
                    </div>
                    
                </div>

                {this.renderSearchResult()}
                
                
                
                
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
            // console.log(this.props.compare[0][0]);
            var one = this.props.compare[0][0];
            var two = this.props.compare[1][0];
            // console.log(two);
            var data = [
                ['Player',one.PLAYER,{ role: 'annotation' }, two.PLAYER,{ role: 'annotation' }],
                ['PTS', parseFloat(one.PTS), one.PTS, parseFloat(two.PTS), two.PTS],
                ['AST', parseFloat(one.AST), one.AST, parseFloat(two.AST), two.AST],
                ['REB', parseFloat(one.REB), one.REB, parseFloat(two.REB), two.REB],
                ['STL', parseFloat(one.STL), one.STL, parseFloat(two.STL), two.STL],
                ['BLK', parseFloat(one.BLK), one.BLK, parseFloat(two.BLK), two.BLK],
                ['FG_PCT', parseFloat(one.FG_PCT), one.FG_PCT, parseFloat(two.FG_PCT), two.FG_PCT],
                ['FG3_PCT', parseFloat(one.FG3_PCT), one.FG3_PCT, parseFloat(two.FG3_PCT), two.FG3_PCT],
            ];
        
              var options = {
                width: 600,
                height: 400,
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' },
                isStacked: "percent"
              };
              return(
                <div className = 'container compareGraph'>
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
                        
                        <div key = {oneRow.PLAYER_ID + oneRow.year} className=" searchResult needInline card" >
                            {/* <img className="card-img-top" src="https://kodi.tv/sites/default/files/styles/medium_crop/public/addon_assets/plugin.video.nba/icon/icon.png?itok=UANlCIrN" alt="Card image cap"></img> */}
                            <div className="card-body searchCard">
                                <button className="card-title searchCardPlayerName" onClick = {()=>this.onClickHandler(oneRow.PLAYER)}>{oneRow.PLAYER}</button>
                                {/* <p className="card-text"></p> */}
                            </div>
                            <ul className="list-group list-group-flush searchCardList">
                                <li className="list-group-item searchCardItem">year: {oneRow.year}</li>
                                <li className="list-group-item searchCardItem">PTS: {oneRow.PTS}</li>
                                <li className="list-group-item searchCardItem">REB: {oneRow.REB}</li>
                                <li className="list-group-item searchCardItem">AST: {oneRow.AST}</li>
                                <li className="list-group-item searchCardItem">STL: {oneRow.STL}</li>
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
