import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import title_and_content from './Title_And_Content';
var count=0;
class TrivialDetail extends Component{
    renderQueryResult(){
        count=0;
        return (
            <div>
            <h3>{title_and_content[this.props.id-1].title} </h3>
            <img src = {title_and_content[this.props.id-1].image } alt ='pics'/>
            <p>{title_and_content[this.props.id-1].content} </p>

            <p>Here are the full list: </p>
            {_.map(this.props.trivial, oneRow => {
                console.log(Object.keys(oneRow).length);
                const keyNum = Object.keys(oneRow).length;
                var i = 0;
                
                const ptag = {display:"inline"};
                return (
                    Object.keys(oneRow).map((key)=> {
                    i++;
                    if(i===1){
                        count++;
                        return (
                            <p style= {ptag} >Rank {count} : {key} : {oneRow[key]} | </p>
                        )
                    }
                    if(i===keyNum){
                        i=0;
                        return (
                            <div style = {ptag}>
                                <p style= {ptag} >{key} : {oneRow[key]} | </p>
                                <div></div>
                            </div>
                        )
                    }
                    return (
                        
                        <p style = {ptag}> {key} : {oneRow[key]} | </p>
                        
                    )})
                    ) 
            })}
            </div>
        )
    }
    render(){
        console.log(this.props.id);
        return (
            <div className = 'container'>  
            {this.renderQueryResult()}
            
            <Link to = '/player/index' className = 'btn btn-outline-secondary'>Go Back</Link>
        </div>
        )
    }
}
function mapStateToProps(state){
    return {
        trivial: state.trivial,
        id: state.showTrivialDetail
    }
}
export default connect(mapStateToProps)(TrivialDetail);