import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    checkDate(survey){
        var respDate = new Date(survey.lastResponded).toLocaleDateString();
        if(respDate === "Invalid Date")
        {
            return 'Response is awaited';
        }
        else{
            return respDate;
        }
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {      

            return(
                <div className="card #424242 grey darken-3" key={survey._id} style={{ width: "87vw", margin: "auto", marginTop: "3vh"}}>
                    <div className="card-content white-text">
                        <span className="card-title">Campaign Title: {survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()},
                            Last Response: {this.checkDate(survey)}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="# ">Yes: {survey.yes}</a>
                        <a href="# ">No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }
    
    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);