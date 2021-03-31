import React, {useEffect} from "react";
import {Menu, Button} from "antd";
import {Link, useHistory, useLocation} from "react-router-dom";
import {LogoutOutlined} from '@ant-design/icons';

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
//import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
//import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";

const SidebarContent = (props) => {
  let history = useHistory();
  let location = useLocation();

  const {sidebarCollapsed, setSidebarCollapsed, user, postLogout, credit} = props;

  let {navStyle, themeType} = useSelector(({settings}) => settings);
  let {pathname} = useSelector(({common}) => common);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  console.log(location)

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          {user && <UserProfile name={user.name} surName={user.surName}/>}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="search">
              <Link to="/search">
                <i className="icon icon-search"/>
                <span>
                  Influencer Arama
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key={"credit"}>
              <Link to="/credit">
                <i className="icon icon-shopping-cart"/>
                <span>
                  Kredi Yükle
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key={"account"}>
              <Link to="/account">
                <i className="icon icon-avatar"/>
                <span>
                  Hesabım
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key={"support"}>
              <Link to="/support">
                <i className="icon icon-ticket-new"/>
                <span>
                  Canlı Destek
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </CustomScrollbars>

        <div className={"sidebar-bottom"}>
          {(credit === null) ? <p>Kredim: {user.credit}</p> : <p>Kredim: {credit}</p>}
          <Button type={"link"} icon={<LogoutOutlined/>} style={{width: '100%', textAlign: 'left', color: '#fff', marginBottom: 15}} onClick={postLogout}>
            Çıkış
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarContent;

