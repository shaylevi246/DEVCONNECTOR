import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, from, to, current, title, description },
}) => {
  return (
    <div>
      <div>
        <h3 className="text-dark">{company}</h3>
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
        {title && (
          <p>
            <strong>Position: </strong>
            {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
