import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStudentCourses } from "../../actions/courseActions";
import Spinner from "../common/Spinner";
import Courses from "./GetCoursesDashboard";

class CourseDashboard extends Component {
  componentDidMount() {
    this.props.getStudentCourses(this.props.auth.user.id);
  }

  render() {
    const { courses, loadin } = this.props.courses;
    let dashboardContent;

    if (courses === null || loadin) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(courses).length > 0) {
        dashboardContent = (
          <div>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <h6>**Please select atleast one course for further action.</h6>
            <p className="lead text-muted">
              {/* Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> */}
            </p>
            <Courses courses={courses} />
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <p>You have no Assignments yet.</p>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Student Portfolio</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseDashboard.propTypes = {
  getStudentCourses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

export default connect(
  mapStateToProps,
  { getStudentCourses }
)(CourseDashboard);
