/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { changeDirection, setDarkTheme, setThemeColor } from "actions/index";
import {
  AMBER,
  BLUE,
  CYAN,
  DARK_AMBER,
  DARK_BLUE,
  DARK_CYAN,
  DARK_DEEP_ORANGE,
  DARK_DEEP_PURPLE,
  DARK_GREEN,
  DARK_INDIGO,
  DARK_PINK,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  INDIGO,
  PINK
} from "constants/ThemeColors";
import SideNavOption from "./SideNavOption";

class ColorOption extends React.Component {
  // eslint-disable-next-line react/sort-comp
  toggleCustomizer = () => {
    const { drawerStatus } = this.state;
    this.setState({ drawerStatus: !drawerStatus });
  };

  closeCustomizer = () => {
    this.setState({ drawerStatus: false });
  };

  handleThemeColor = colorCode => {
    this.props.setThemeColor(colorCode);
    const body = document.body.classList;
    body.remove(this.props.themeColor);
    body.remove("dark-theme");
    body.add(colorCode);
  };

  handleDarkTheme = () => {
    const { themeColor, setDarkTheme } = this.props;
    setDarkTheme();
    const body = document.body.classList;
    body.toggle(themeColor);
    body.toggle("dark-theme");
  };

  constructor() {
    super();
    this.state = { drawerStatus: false };
  }

  componentDidMount() {
    const { themeColor } = this.props;
    document.body.classList.add(themeColor);
  }

  render() {
    const { themeColor, darkTheme, isDirectionRTL } = this.props;
    const { drawerStatus } = this.state;
    return (
      <div className="theme-option">
        <IconButton onClick={this.toggleCustomizer.bind(this)}>
          <i className="zmdi zmdi-settings zmdi-hc-spin text-white" />
        </IconButton>
        <Drawer
          className="app-sidebar-content right-sidebar"
          anchor="right"
          open={drawerStatus}
          onClose={this.closeCustomizer.bind(this)}
        >
          <div className="color-theme">
            <div className="color-theme-header">
              <h3 className="color-theme-title">Service Panel </h3>

              <IconButton className="icon-btn" onClick={this.closeCustomizer}>
                <i className="zmdi zmdi-close text-white" />
              </IconButton>
            </div>
            <div className="color-theme-body">
              <h3>Light Sidenav</h3>
              <ul className="color-option">
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, INDIGO)}
                    className={`jr-link bg-indigo ${themeColor === INDIGO &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, CYAN)}
                    className={`jr-link bg-cyan ${themeColor === CYAN &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, AMBER)}
                    className={`jr-link bg-amber ${themeColor === AMBER &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DEEP_ORANGE)}
                    className={`jr-link bg-deep-orange ${themeColor ===
                      DEEP_ORANGE && "active"}`}
                  />
                </li>

                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, PINK)}
                    className={`jr-link bg-pink ${themeColor === PINK &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, BLUE)}
                    className={`jr-link bg-blue ${themeColor === BLUE &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DEEP_PURPLE)}
                    className={`jr-link bg-deep-purple ${themeColor ===
                      DEEP_PURPLE && "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, GREEN)}
                    className={`jr-link bg-green ${themeColor === GREEN &&
                      "active"}`}
                  />
                </li>
              </ul>
              <h3>Dark Sidenav</h3>
              <ul className="color-option cr-op-dark-sidebar">
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_INDIGO)}
                    className={`jr-link bg-indigo ${themeColor ===
                      DARK_INDIGO && "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_CYAN)}
                    className={`jr-link bg-cyan ${themeColor === DARK_CYAN &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_AMBER)}
                    className={`jr-link bg-amber ${themeColor === DARK_AMBER &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_DEEP_ORANGE)}
                    className={`jr-link bg-deep-orange ${themeColor ===
                      DARK_DEEP_ORANGE && "active"}`}
                  />
                </li>

                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_PINK)}
                    className={`jr-link bg-pink ${themeColor === DARK_PINK &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_BLUE)}
                    className={`jr-link bg-blue ${themeColor === DARK_BLUE &&
                      "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_DEEP_PURPLE)}
                    className={`jr-link bg-deep-purple ${themeColor ===
                      DARK_DEEP_PURPLE && "active"}`}
                  />
                </li>
                <li>
                  <span
                    onClick={this.handleThemeColor.bind(this, DARK_GREEN)}
                    className={`jr-link bg-green ${themeColor === DARK_GREEN &&
                      "active"}`}
                  />
                </li>
              </ul>
              <div className="row text-left">
                <div className="col-6">
                  <h3 className="mb-1">RTL</h3>
                  <Switch
                    color="primary"
                    checked={isDirectionRTL}
                    onChange={this.props.changeDirection}
                  />
                </div>
                <div className="col-6">
                  <h3 className="mb-1">Dark Theme</h3>
                  <Switch
                    color="primary"
                    checked={darkTheme}
                    onChange={this.handleDarkTheme}
                  />
                </div>
              </div>
              <div className="mt-3">
                <SideNavOption closeCustomizer={this.closeCustomizer} />
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { themeColor, darkTheme, isDirectionRTL } = settings;
  return { themeColor, darkTheme, isDirectionRTL };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setThemeColor, setDarkTheme, changeDirection }
  )(ColorOption)
);
