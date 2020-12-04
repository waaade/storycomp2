import React from 'react';
//This component shows a user's projects and their entires


class Browser extends React.Component {
    //This component should be given a collection of either projects or entries
    constructor(props) {
        super(props);
        this.state = {
            showing: "projects",
        };
    }
    render() {
        //Loop through project names & ids and put each into a Project component
        if (this.state.showing == "projects") {
            return (<div>
            <p>Jack Frost says "hee ho!"</p>
            <ProjectList projects={props.collection} />
            </div>);
        }
        else {
            return (<div><p>Impossible....</p></div>);
        }
    }
}

//Needs a collection of projects in props
class ProjectList extends React.Component {
    render() {
        <div>
        {props.projects.map(project => (
            <Project data={project.data} key={project.id} />
        ))}
        </div>
    }
}

class Project extends React.Component {
    render() {
        return (<div><h3>{props.info.name}</h3></div>);
    }
}

export { Browser, ProjectList, Project };