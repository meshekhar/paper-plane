import React from 'react';

import MenuItem from "../menu-item/menu-item.component";
import {selectDirectorySections} from "../../redux/directory/directory.selector";
import {connect} from "react-redux";

const Directory = ({sections}) => (

    <div className='directory-menu'>
        {
            sections.map(({id, title, imageUrl, size, linkUrl}) => (
                <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
            ))
        }
    </div>
)

const mapStateToProps = state => ({
    sections: selectDirectorySections(state)
})

export default connect(mapStateToProps)(Directory);
