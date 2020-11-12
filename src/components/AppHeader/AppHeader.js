import React from 'react';
import PropTypes from "prop-types"

import styles from "./AppHeader.module.less"

const AppHeader = ({ title }) => {
    return (
        <header className={styles.root}>
            <span className={styles.title}>{title}</span>
        </header>
    )
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default AppHeader
