import React, {  useEffect, useRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import useStyles from './style.js';
import Places from '../Places/Places';

const List = ({ places, isLoading, childClicked, type, setType, rating, setRating }) => {
  const classes = useStyles();
  const elRefs = useRef([]);

  useEffect(() => {
    elRefs.current = Array(places.length).fill().map((_, i) => elRefs.current[i] || React.createRef());
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels, and Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} className={classes.formControlContainer}>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControlSmall}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="restaurants">Restaurants</MenuItem>
                  <MenuItem value="hotels">Hotels</MenuItem>
                  <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControlSmall}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={3}>Above 3.0</MenuItem>
                  <MenuItem value={4}>Above 4.0</MenuItem>
                  <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs.current[i]} key={i} item xs={12}>
                <Places selected={Number(childClicked) === i} refProp={elRefs.current[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
