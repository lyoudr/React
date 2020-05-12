import { Route, Link, Switch } from 'react-router-dom';
import React, {unstable_Profiler as Profiler} from 'react';
import { BusinessContainer, EconomicsContainer } from './subject/subject/containers/subcontainer';
import Technology from './subject/technology/technology';
import { Animal } from './subject/animal/Animal';
import '../../assets/sass/global/global.scss';
import '../../assets/sass/courses/courses.scss';

const Courses = ({ match }) => {
    console.log('match is =>', match);
    function estimatePerformance(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions){
        console.log('id is =>', id);
        console.log('phase is =>', phase);
        console.log('actualDuration is =>', actualDuration);
        console.log('baseDuration is =>', baseDuration);
        console.log('startTime is =>', startTime);
        console.log('commitTime is =>', commitTime);
        console.log('interactions is =>', interactions);
    }
    return(
        <Profiler id ="course" onRender={estimatePerformance}>
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
        </Profiler>
    )
};

export default Courses;