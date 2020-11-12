import React from "react";
import PropTypes from "prop-types";

import styles from "./Panel.module.less";

const Panel = ({ title, children, className }) => {
  return (
    <div className={[styles.root, className].join(" ")}>
      <span className={styles.title}>{title}</span>
      <div>{children}</div>
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Panel.defaultProps = {
  className: "",
};

export default Panel;
