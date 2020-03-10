import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../template/customButton.css'
import '../template/customTable.css'

import React from 'react'
import Menu from '../template/menu'
import Routes from './routes'

export default props => (

    <div className='container'>
        <Menu></Menu>
        <Routes></Routes>
    </div>

)

