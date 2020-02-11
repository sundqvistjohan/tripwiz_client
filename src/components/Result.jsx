import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

const Result = () => {

  return (
    <>
      <Grid>
        <Grid.Column>
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
