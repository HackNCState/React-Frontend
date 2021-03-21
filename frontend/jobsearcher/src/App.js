import React from 'react';

import JobCard from './Components/Card/Card.jsx';
import Query from './Components/Query/Query.jsx';

import './App.css';

const url = "http://localhost:5000/retrieveJobs";

class App extends React.Component {

  // constructor to initialize App component
  constructor() {
    super()

    // initial card to display while information is loading
    let initialJob = {
      "company": "Loading",
      "salary": "Loading",
      "summary": "Loading",
      "title": "Loading Intern"
    }

    // save initial states of job list from API and set of unique companies 
    this.state = {
      allJobs: [initialJob],
      filteredJobs: [initialJob],
      jobCompanySet: []
    }

    // bind function to initially retrieve jobs from back-end API
    this.retrieveJobs = this.retrieveJobs.bind(this)
  }

  // when component initializes, get list of jobs from back-end
  componentDidMount() {
    this.retrieveJobs()
  }

  retrieveJobs() {
    
    // make GET request to local Flask server to obtain job data
    fetch(url, {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {

        // save list of jobs and initial unfiltered list of jobs
        this.setState({allJobs: data})
        this.setState({filteredJobs: data})

        // create set with each company from the entire list of jobs and save it to the state 
        let set = new Set(data.map((job) => job.company))
        this.setState({jobCompanySet:  Array.from(set)})

      }
    )
  }


  
  render() {

    // handle search requests and save the shortened list of jobs with only the matching company
    const handleJobFilter = (filteredJobs) => {
      this.setState({filteredJobs: filteredJobs});
    }
 

    return (
      <div className="App">

        {/* Place tile of application at the top */}
        <div className="title">
          <h1>Job Searcher</h1>
        </div>

        {/* Display the Query component with the dropdown to filter by company and the button to search with */}
        <div className="jobInfo">
          <Query 
            jobCompanies={this.state.jobCompanySet}
            jobs={this.state.allJobs}
            onJobFilter={handleJobFilter}
          /> 
        </div>

        {/* Display the list of cards, with one card for each of the jobs in filteredJobs */}
        <div className="jobCards" >
          {
                this.state.filteredJobs.map((jobInfo, index) =>           
                  <JobCard 
                    company={jobInfo.company}
                    title={jobInfo.title}
                    summary={jobInfo.summary}
                    salary={jobInfo.salary}
                  />
                )
          }
        </div>
      </div>
    );
  }
}

export default App;

