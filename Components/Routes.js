import {Route, Switch} from 'react-router-dom'
import Room from './Components/Room'

export default (
    <Switch>
        <Route path='/room' component={Room} />
    </Switch>
)