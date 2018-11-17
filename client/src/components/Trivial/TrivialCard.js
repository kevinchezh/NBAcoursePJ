import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import TrivialDetail from './TrivialDetail'
import {Link} from 'react-router-dom';
class TrivialCard extends Component{
    
    render(){
        const cardStyle = {
            width: '18rem'
        }
        const id = 1;
        
        
        return(
            <div className="card border-success mb-3" style={cardStyle}>
                <div className="card-header">Did you know?</div>
                <div className="card-body text-success">
                    <h5 className="card-title">Who is a postseason type player?</h5>
                    <p className="card-text">The players has a better performance in post season than in regular season
by points, assists, and Reb etc</p>
                    <Link to ='/trivial/detail' className = 'btn btn-primary' onClick = {()=>{
                        
                        this.props.fetchTrivialDetail(id)
                        this.props.showTrivialDetail(true)}
                        }>More Info</Link>
                </div>
            </div>
        )
             
    }
}
function mapStateToProps(state){
    return {
        trivial: state.trivial
    }
}
export default connect(mapStateToProps,actions)(TrivialCard);