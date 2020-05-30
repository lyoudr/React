import { Route, Link, Switch } from 'react-router-dom';
import React, { unstable_Profiler as Profiler, useEffect, useState } from 'react';
import { BusinessContainer, EconomicsContainer } from './subject/subject/containers/subcontainer';
import {Technology} from './subject/technology/technology';
import Animal from './subject/animal/containers/animalContainer';
import bookmark from '../../assets/icon/icons8-bookmark.svg';
import calendar from '../../assets/icon/icons8-calendar.svg';
import about from '../../assets/icon/icons8-about.svg';
import plus from '../../assets/icon/icons8-plus.svg';
import '../../assets/sass/global/global.scss';
import '../../assets/sass/courses/courses.scss';

const Courses = ({ match }) => {
  function estimatePerformance(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
    // console.log('id is =>', id);
    // console.log('phase is =>', phase);
    // console.log('actualDuration is =>', actualDuration);
    // console.log('baseDuration is =>', baseDuration);
    // console.log('startTime is =>', startTime);
    // console.log('commitTime is =>', commitTime);
    // console.log('interactions is =>', interactions);
  }
  return (
    // <Profiler id="course" onRender={estimatePerformance}>
      <div className="courses main">
        <nav>
          <Link to='/courses'>
            <span className="subject">Technology</span>
            <img className='icon' src={bookmark} />
          </Link>
          <Link to='/courses/business'>
            <span className="subject">Business</span>
            <img className='icon' src={calendar} />
          </Link>
          <Link to='/courses/economics'>
            <span className="subject">Economics</span>
            <img className='icon' src={about} />
          </Link>
          <Link to='/courses/animal'>
            <span className="subject">Animal</span>
            <img className='icon' src={plus} />
          </Link>
        </nav>
        <Switch>
          <Route exact path='/courses/' component={Technology} />
          <Route path='/courses/business' component={BusinessContainer} />
          <Route path='/courses/economics' component={EconomicsContainer} />
          <Route path='/courses/animal' component={Animal} />
        </Switch>
      </div>
    // </Profiler>
  )
};

export default Courses;