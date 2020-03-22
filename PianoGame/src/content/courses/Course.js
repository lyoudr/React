import { Route, Link, Switch } from 'react-router-dom';
import React from 'react';
import { BusinessContainer, EconomicsContainer } from './subject/subject/containers/subcontainer';
import Technology from './subject/technology/technology';
import { Animal } from './subject/animal/Animal';
import '../../assets/sass/global/global.scss';
import '../../assets/sass/courses/courses.scss';

const Courses = ({ match }) => {
    console.log('match is =>', match);
    return(
        <div className ="courses main">
            <nav>
                <Link to = '/courses/technology'>Technology</Link>
                <Link to = '/courses/business'>Business</Link>
                <Link to = '/courses/economics'>Economics</Link>
                <Link to = '/courses/animal'>Animal</Link>
            </nav>
            <Switch>
                <Route exact path = '/courses/technology' component={Technology}/>
                <Route exact path = '/courses/business' component = {BusinessContainer}/>
                <Route exact path = '/courses/economics' component = {EconomicsContainer}/>  
                <Route exact path = '/courses/animal' component = {Animal}/>
            </Switch>
        </div>
    )
};

export default Courses;