import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  NewProjects,
  RoiPerCustomer,
  TodaysMoney,
  SystemHealth,
  PerformanceOverTime
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DashboardDefault = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Default Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <TodaysMoney />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <NewProjects />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <SystemHealth />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <RoiPerCustomer />
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
        >
          <PerformanceOverTime />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DashboardDefault;
