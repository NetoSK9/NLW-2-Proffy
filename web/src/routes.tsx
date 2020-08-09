import React from 'react';
import{BrowserRouter,Route} from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeatcherList';
import TeacherFrom from './pages/TeacherFrom';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherFrom}/>
        </BrowserRouter>
    )
}

export default Routes;