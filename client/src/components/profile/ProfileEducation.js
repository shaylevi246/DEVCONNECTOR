import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, fieldofstudy, from, to, current, degree, description },
}) => {
  return (
    <div>
      <div>
        <h3 className="text-dark">{school}</h3>
        <p>
          {current ? (
            <span>
              <Moment format="DD/MM/YYYY">{from}</Moment> - Now{" "}
            </span>
          ) : (
            <span>
              <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
              <Moment format="DD/MM/YYYY">{to}</Moment>
            </span>
          )}
        </p>
        {degree && (
          <p>
            <strong>Degree: </strong>
            {degree}
          </p>
        )}
        {degree && (
          <p>
            <strong>Field Of Study: </strong>
            {fieldofstudy}
          </p>
        )}
        {description && (
          <p>
            <strong>Description: </strong>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
