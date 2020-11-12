import React from "react";

import styles from "./SuccessAlert.module.less";

const SuccessAlert = () => {
  return (
    <div className={styles.root}>
      <span className={styles.title}>Success</span>
      <span className={styles.content}>Event has been created.</span>
    </div>
  );
};

export default SuccessAlert;
