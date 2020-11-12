import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../redux/actions";
import Panel from "../Panel";

import styles from "./NewEventForm.module.less";

const NewEventForm = ({
  categories,
  coordinators,
  user,
  getCategories,
  getCoordinators,
  submitForm,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: 0,
    coordinatorId: "4",
    payment: "free",
    fee: "",
    email: "",
    date: "",
    time: "",
    duration: "",
    reward: "",
  });

  useEffect(() => {
    getCategories();
    getCoordinators();
  }, []);

  const onFieldChange = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = formatFormData(formData, [...coordinators, user]);

    console.log(payload);
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Panel title="About">
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>
            Title<span className="super">*</span>
          </label>
          <input
            className="long"
            name="title"
            placeholder="Make it short and clear"
            onChange={onFieldChange}
            required
          />
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>
            Description<span className="super">*</span>
          </label>
          <div>
            <textarea
              className="long"
              name="description"
              placeholder="Write about your event, be creative"
              onChange={onFieldChange}
              maxLength="140"
              required
            ></textarea>
            <div className="flex-container f-j-between">
              <span>Maximum length 140 characters</span>
              <span>{formData.description.length}/140</span>
            </div>
          </div>
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>Category</label>
          <select className="long" name="categoryId" onChange={onFieldChange}>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>Payment</label>
          <div className="flex-container">
            <div>
              <input
                type="radio"
                value="free"
                name="payment"
                onChange={onFieldChange}
                defaultChecked
              />
              <label>Free event</label>
            </div>
            <div className="m-l-10">
              <input
                type="radio"
                value="paid"
                name="payment"
                onChange={onFieldChange}
              />
              <label>Paid event</label>
            </div>
          </div>
        </div>
        {formData.payment === "paid" && (
          <div className={styles.fieldRow}>
            <label className={styles.fieldName}>
              Fee<span className="super">*</span>
            </label>
            <div>
              <input
                type="number"
                className="small"
                placeholder="Fee"
                onChange={onFieldChange}
                required
                min="0"
                name="fee"
              />
            </div>
          </div>
        )}
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>Reward</label>
          <div>
            <input
              type="number"
              className="small"
              placeholder="Number"
              onChange={onFieldChange}
              min="0"
              name="reward"
            />
            <span className="m-l-10">reward points for attendance</span>
          </div>
        </div>
      </Panel>
      <Panel className="m-t-20" title="Coordinator">
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>
            Responsible<span className="super">*</span>
          </label>
          <select
            className="long"
            name="coordinatorId"
            onChange={onFieldChange}
          >
            <option value="" disabled>
              Select a coordinator
            </option>
            <optgroup label="Me">
              {user && (
                <option
                  defaultValue
                  value={user.id}
                >{`${user.name} ${user.lastname}`}</option>
              )}
            </optgroup>
            <optgroup label="Others">
              {coordinators.map((coordinator) => (
                <option
                  key={coordinator.id}
                  value={coordinator.id}
                >{`${coordinator.name} ${coordinator.lastname}`}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>Email</label>
          <input
            name="email"
            className="long"
            type="email"
            placeholder="Email"
            onChange={onFieldChange}
          />
        </div>
      </Panel>
      <Panel className="m-t-20" title="When">
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>
            Starts on <span className="super">*</span>
          </label>
          <div className="flex-container f-a-center">
            <input
              className="medium"
              name="date"
              type="date"
              placeholder="dd/mm/yyyy"
              onChange={onFieldChange}
              required
            />
            <span className="m-l-10">at</span>
            <input
              name="time"
              className="small m-l-10"
              type="time"
              onChange={onFieldChange}
              required
            />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.fieldName}>Duration</label>
          <div>
            <input
              name="duration"
              className="small"
              type="number"
              placeholder="Number"
              onChange={onFieldChange}
              min="0"
            />
            <span className="m-l-10">hour</span>
          </div>
        </div>
      </Panel>
      <div className="text-center">
        <button type="submit" className="m-t-20">
          publish event
        </button>
      </div>
    </form>
  );
};

const formatFormData = (formData, coordinators) => {
  const { email, id } = coordinators.find(
    (coordinator) => coordinator.id === parseInt(formData.coordinatorId)
  );

  const formattedFormData = {
    title: formData.title,
    description: formData.description,
    category_id: parseInt(formData.categoryId),
    paid_event: formData.payment === "paid",
    event_fee: Number(formData.fee),
    reward: Number(formData.reward),
    date: `${formData.date}T${formData.time}`,
    duration: parseInt(formData.duration),
    coordinator: {
      email,
      id,
    },
  };
  return formattedFormData;
};

NewEventForm.propTypes = {
  categories: PropTypes.array.isRequired,
  coordinators: PropTypes.array.isRequired,
  user: PropTypes.object,
  getCoordinators: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

NewEventForm.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({
  categories: state.form.categories,
  coordinators: state.form.coordinators,
  user: state.form.user,
});

const mapDispatchToProps = (dispatch) => ({
  getCoordinators: () => dispatch(actions.getCoordinators()),
  getCategories: () => dispatch(actions.getCategories()),
  submitForm: () => dispatch(actions.submitForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEventForm);
