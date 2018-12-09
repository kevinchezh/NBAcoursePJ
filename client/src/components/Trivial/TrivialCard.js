import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Link} from 'react-router-dom';
import title_and_content from './Title_And_Content';
class TrivialCard extends Component{
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5000);
      }
    componentWillUnmount() {
    clearInterval(this.interval);
    }
    render(){
        const cardStyle = {
            width: '18rem'
        }
        var id = Math.floor((Math.random() * 9) + 1);
        return(
            <div className="card border-success mb-3" style={cardStyle}>
                <div className="card-header">Did you know?</div>
                <div className="card-body text-success">
                    <h5 className="card-title">{title_and_content[id-1].title}</h5>
                    <p className="card-text"> {title_and_content[id-1].content}</p>
                    <Link to ='/trivial/detail' className = 'btn btn-primary' onClick = {()=>{
                        
                        this.props.fetchTrivialDetail(id)
                        this.props.showTrivialDetail(id)}
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