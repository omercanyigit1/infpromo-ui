import React from "react";
//import {Avatar, Popover} from "antd";

const UserProfile = ({name, surName}) => {

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-2 gx-avatar-row">
      <span className="gx-avatar-name" style={{width: '100%', textAlign: 'center', color: '#fff'}}>
        {name} {surName}
      </span>
    </div>

  )
};

export default UserProfile;
