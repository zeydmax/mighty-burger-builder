import React, {useState} from 'react'
import {connect} from 'react-redux'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => setShowSideDrawer(false)
  const sideDrawerToggleHandler = () => setShowSideDrawer(!showSideDrawer)
  
  return (
    <React.Fragment>
      <Toolbar isLoggedIn={props.isLoggedIn} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isLoggedIn={props.isLoggedIn}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(layout)
