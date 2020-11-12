import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppHeader from "./components/AppHeader";
import NewEventForm from "./components/NewEventForm";

import SuccessAlert from "./components/SuccessAlert";

import styles from "./App.module.less";

const App = ({ isFormSubmitted }) => {
  return (
    <div className={styles.root}>
      <AppHeader title="New event"></AppHeader>
      <div className={styles.content}>
        {isFormSubmitted ? <SuccessAlert /> : <NewEventForm />}
      </div>
    </div>
  );
};

App.propTypes = {
  isFormSubmitted: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isFormSubmitted: state.form.isFormSubmitted,
});

export default connect(mapStateToProps)(App);
