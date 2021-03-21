// import react to use functions from react such as return() 
import React from 'react';

// import material-ui dropdown related components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

// import material-ui button related component
import Button from '@material-ui/core/Button';

// import necessary styling
import { makeStyles, createStyles } from '@material-ui/core/styles'
import './Query.css'; 


// function to take a full list of jobs and a target company
// this function will return only the job postings belonging to that target company
function filterJobs(jobs, company) {
    return jobs.filter(function (job)  {
            return company.valueOf() == job.company.valueOf() 
    })
}

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);


export default function Query(props) { 
    
    const classes = useStyles();

    // useState hook to save current company selected
    const [company, setCompany] = React.useState('');

    // handles a change in the Select value
    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    // handles moment when button is pressed and list of filtere djobs needs to change to reflect company requested
    const handleJobChange = (filteredJobs) => {
        props.onJobFilter(filteredJobs)
    }

    return (
      <div>
        {/* Logic to display dropdown and handle when user changes their selection */}
        <FormControl className={classes.formControl}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleCompanyChange}
                value={company}
            >
                {
                    props.jobCompanies.map((company) => <MenuItem value={company}>{company}</MenuItem>)
                }
            </Select>
            <FormHelperText>Filter by company</FormHelperText>
        </FormControl>
        {/* Logic to display button allowing user to filter by a specific company and alert the appropriate functions within the main logic flow */}
        <Button 
          variant="contained" 
          color ="primary"
          onClick={() => handleJobChange(filterJobs(props.jobs, company))}
        >
            Search
        </Button>
      </div>
    );
}