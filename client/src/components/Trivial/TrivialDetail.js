import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import title_and_content from './Title_And_Content';
import '../../Styles/trivial.css';
import TrivialCard from './TrivialCard';
var count=0;
class TrivialDetail extends Component{
    renderQueryResult(){
        count=0;
        return (
            <div>
            <h3 className='title'>{title_and_content[this.props.id-1].title} </h3>
            <div className = 'row'>
                <div className = 'col-9'>
                    <img className = 'image' src = {title_and_content[this.props.id-1].image } alt ='pics'/>
                </div>
                <div className = 'col-3'>
                    <TrivialCard />
                </div>
            </div>
            
            <p className = 'content' >{title_and_content[this.props.id-1].content} </p>

            <p className = 'content'>Here are the full list: </p>
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
                            <p className='query' style= {ptag} >Rank {count} : {key} : {oneRow[key]} | </p>
                        )
                    }
                    if(i===keyNum){
                        i=0;
                        return (
                            <div style = {ptag}>
                                <p className='query' style= {ptag} >{key} : {oneRow[key]} | </p>
                                <div></div>
                            </div>
                        )
                    }
                    return (
                        
                        <p className='query' style = {ptag}> {key} : {oneRow[key]} | </p>
                        
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
            
            <Link to = '/player/index' className = 'btn btn-outline-secondary back'>Go Back</Link>
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