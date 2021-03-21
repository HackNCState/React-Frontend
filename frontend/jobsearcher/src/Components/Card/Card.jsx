// import react to use functions from react such as return() 
import React from 'react';

// import material-ui card components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// import necessary styling
import './Card.css';
import { makeStyles, createStyles } from '@material-ui/core/styles'

// save constant variable for message if no salary is provided for a specific job
const noSalaryMessage = "No salary data";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: "25vw",
    marginTop: "10px",
    marginLeft: "20px"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  salary: {
    fontSize: 16,
    color: '#cc0000'
  }, 
  pos: {
    marginBottom: 5,
  },
});

export default function JobCard(props) {

    const classes = useStyles();

    return (
      <Card className={classes.root}>
       
      {/* Create Card component and format appropriately, displaying all of the information in the JSON object */}
        <CardContent>
          {/* Displaying the company name and job title */}
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.company} - {props.title}
          </Typography>

          {/* Displaying the job's description */}
          <Typography className={classes.pos} color="textSecondary">
            {props.summary}
          </Typography>
      

          {/* Save salary if provided, or alternate message if no salary is given */}
          <Typography className={classes.title} color="textSecondary">
            {props.salary.valueOf() === "".valueOf() ? noSalaryMessage : props.salary}
          </Typography>
          
        </CardContent>
      </Card>
    );
}