import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
class TrivialDetail extends Component{
    renderQueryResult(){
        return (
            _.map(this.props.trivial, oneRow => {
                return (
                    Object.keys(oneRow).map((key)=> {
                    return <p>{oneRow[key]}</p>
                }))  
            })
        )
    }
    render(){
        return (
            <div className = 'container'>
            <h3>This is title</h3>
            <p> This is content</p>
            {/* TODO: should pass in some kind of id to identify which
            Query should we render */}
            {this.renderQueryResult()}
        </div>
        )
    }
}
function mapStateToProps(state){
    return {
        trivial: state.trivial
    }
}
export default connect(mapStateToProps)(TrivialDetail);