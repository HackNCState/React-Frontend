# Getting Started with React 

## What is React
React.js is a flexible JavaScript library for building user interfaces. It lets you create complex UIs from small pieces of code called components. React allows developers to create large web applications that can change data, without reloading the page.


## React Helpful Links and Required Installation
These are some helpful links to reference for information on ```React``` and ```NodeJS```
* [NodeJS](https://nodejs.org/en/ "NodeJS")
* [Create a New React App](https://github.com/facebook/create-react-app "Create a New React App")
* [Additional information and troubleshoot about React and its necessary tools](https://reactjs.org/tutorial/tutorial.html)

1. To begin working with React, [please visit this link and install NodeJS (the latest LTS version for your OS) on your local computer](https://nodejs.org/en/).

### Clone Your Personal Repo...
We would recommend creating a personal repo for this project. We have a template repo that we are providing to you, which has a directory structure that is also recommended for you to follow.  
If you would not like to use a GitHub repo, you are free to use a local directory with a similar directory structure.

2. Run the following command to create React app. 
```
npx create-react-app my-app
cd my-app
```

3. Run the following command to run React app locally on localhost:3000
```
npm start
```
 
### Or Clone Our Template Repo 
Clone this template repo. Please **DO NOT CLONE TO THE SAME DIRECTORY FROM ABOVE** as this will make it hard to work on the next part!

2. Run the following command to clone our template repo with the existing React app.
```
git clone https://github.com/PackHacks/JobSearcherDev
```

3. Run the following command to run React app locally on localhost:3000
```
npm start
```

## What are the files in a React project? 
* **node_modules** - Folder of necessary files and packages for your React App 
* **App.js** - The main React component that the browser will use to display your frontend 
* **App.css** - The styling for the React component from App.js 
* **package.json** - A file that shows packages or dependencies used in your project 
* **index.js** - Purpose is to mount your React component to [virtual-dom](https://www.codecademy.com/articles/react-virtual-dom)

## Installing Packages to use other public React components 
NPM stands for Node Package Manager, which is responsible for installing and managing packages. 
```
npm install @material-ui/core 
```

## What are components? 
We will be building components, which are parts of the UI split into independent and reusable pieces. React components enable us to think about each piece of our application in isolation. Components can be made up of  HTML elements, JavaScript code, or custom CSS styles. 
  - We have two types of components: 
    - **Function Components:** Components that contain immutable data or props 
    - **Class Components:** Components that contain mutable data or state  

## Creating the Card component 

**1.** Import ```React``` and the necessary components for the ```Card``` from ```Material-UI```. This allows for more efficient styling using pre-existing designs. In our case, ```Card.css``` contains the styles we have defined for our custom component.
```javascript
import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './Card.css';
```

**2.** Define any constants/default variables. In our case, we have a message that we plan to display when we do not have salary information on a specific job.
```javascript
const noSalaryMessage = "No salary data";
```

**3.** Create a function for the card. To create a function component in ```React```, we use curly braces to denote what will be inside the function component and place our ```HTML``` elements inside the ```return``` statement.
```javascript
export default function JobCard(props) {
    return (
             ...
    );
}
```
*TIP: React requires you to return a single HTML element in your components. In order to meet this requirement, you should make sure that all of your HTML elements inside the return statement are wrapped inside of a single* ```<div>``` *tag.*

**4.** We use the ```Typography``` component from ```Material-UI``` to display text and format it. ```CardContent``` contains all of the components we will use to display information about each job. The following code should be placed inside the ```return``` statement of the function component created in the previous step.
```javascript
      <Card id={"root"}>
        <CardContent>
          <Typography id={"title"} color="textPrimary" gutterBottom>
            {props.company} - {props.title}
          </Typography>

          <Typography id={"pos"} color="textSecondary">
            {props.summary}
          </Typography>
```

**5.** This code shows the salary of the given job in the card (if one is provided). Here, we are using a *ternary operator*, which is a shortened way to choose between two options based on a condition. In this scenario, we show the salary if the company has decided to provide one. Otherwise, we display the ```noSalaryMessage```, which we had saved earlier in step 2.
```javascript
          <Typography id={"title"} color="textSecondary">
            {props.salary.valueOf() === "".valueOf() ? noSalaryMessage : props.salary}
          </Typography>
        </CardContent>
      </Card>
    );
}
```

## Creating the Query component 

**1.** Import ```React``` and the necessary ```Select``` and ```Button``` components from ```Material-UI```. ```Query.css``` contains the styles we have defined for our custom component. The ```FormControl```, ```FormHelperText```, and ```MenuItem``` components are all used by ```Material-UI``` in order to support and customize the ```Select``` dropdown we will be using to query and filter available jobs.
```javascript
import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import './Query.css'; 
```

**2.** Create a function called ```filterJobs``` to take a list ```jobs``` and a string ```company``` to filter by. ```filterJobs``` will then use the built-in ```JavaScript``` function ```filter``` to save the jobs with a ```company``` property that matches the parameter passed in.
```javascript
function filterJobs(jobs, company) {
    return jobs.filter(function (job)  {
            return company.valueOf() == job.company.valueOf() 
    })
}
```

**3.** Create a function for the query. In addition, we utilize the ```useState``` *hook* in ```React``` to save ```company``` (the selected value from the dropdown) within the *state* of the ```Query``` function component. Although function components do not normally have states, *hooks* enable features such as state to be added to function components. The ```handleCompanyChange``` and ```handleJobChange``` methods exist to process changes to the dropdown or clicks of the search button.
```javascript
export default function Query(props) { 
    const [company, setCompany] = React.useState('');

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    const handleJobChange = (filteredJobs) => {
        props.onJobFilter(filteredJobs)
    }
```

**4.** Here, the ```FormControl``` is used to manage the dropdown where users can select a company to filter by. We use ```map``` to display the entire list of companies corresponding to the jobs we displayed. Once a user selects one of the company options, ```handleCompanyChange``` will handle that preference being saved within the state of the ```Query``` component.
```javascript
    return (
      <div>
        <FormControl id={"formControl"}>
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
 ```
 
 **5.** The ```Button``` allows the user to click and search for jobs at the company they selected in the dropdown. The ```handleJobChange``` ```callback``` function will be applied on the list of ```filteredJobs``` for that specific company, and the corresponding function in the ```parent``` component of Query (```App.js``` in this case) will be called to save the filtered list of jobs to the ```App``` component's state in order to display it on the screen.
 ```javascript
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
```


## Creating the App component 

**1.** The App component combines the work from the previous components and utilize it to create the front page of our web application. It's like the glue of the application that brings together the components. Import ```React``` and the  ```JobCard``` and ```Query``` custom components that we created to manage sub-tasks when displaying and filtering the list of jobs obtained from the back-end *API*.
```javascript
import React from 'react';

import JobCard from './Components/Card/Card.jsx';
import Query from './Components/Query/Query.jsx';

import './App.css';
```

**2.** We save the back-end API URL as a constant, since we will use it within our main component. 
```javascript
const url = "http://localhost:5000/retrieveJobs";
```

**3.** We create the class component ```App```, which houses our main logic for displaying and filtering jobs. Since class components require a *constructor*, we define the constructor to intialize our *states* and *bind* any methods we have created. We start by saving ```initialJob``` as what we consider a temporary loading card. All of the attributes for this sample ```JSON ``` object will be displayed before we receive any response from our back-end. 
```javascript
class App extends React.Component {

  constructor() {
    super()

    let initialJob = {
      "company": "Loading",
      "salary": "Loading",
      "summary": "Loading",
      "title": "Loading Intern"
    }
```

**4.** In the rest of the constructor, we save the initial states ```allJobs``` and ```filteredJobs``` to include our temporary loading card information. While ```allJobs``` will contain the entire list of jobs we receive from the back-end and will remain consistent throughout our application, ```filteredJobs``` will vary based on the company that was selected in the ```Query``` dropdown.
```javascript
    this.state = {
      allJobs: [initialJob],
      filteredJobs: [initialJob],
      jobCompanySet: []
    }

    this.retrieveJobs = this.retrieveJobs.bind(this)
  }
```

**5.** We use what is known as a *React lifecycle method* called ```componentDidMount``` to call our back-end API as soon as our main ```App``` component is inserted into the ```DOM```, or initialized. We will look into the ```retrieveJobs``` method in more detail in the next step.
```javascript
  componentDidMount() {
    this.retrieveJobs()
  }
```

**6.** We define a method called ```retrieveJobs``` to obtain information about the job postings we have scraped from the back-end. The ```fetch``` method in React is used to make *HTTP* requests and call APIs. We make a ```GET``` request to our back-end and save the list of jobs returned to the appropriate states. The *Set* data structure allows us to save a list of the companies from all of the job postings, where each company is only included once.
```javascript
  retrieveJobs() {
    
    fetch(url, {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        this.setState({allJobs: data})
        this.setState({filteredJobs: data})

        let set = new Set(data.map((job) => job.company))
        this.setState({jobCompanySet:  Array.from(set)})
      }
    )
  }
```

**7.** First, we create the ```handleJobFilter``` method to save the ```filteredJobs``` by company. This method will be called by the *callback* function in the ```Query``` component whenever the ```Search``` button is pressed to look for job postings from a different company. The ```return``` statement begins the display of the job information, and we pass the appropriate parameters to the ```Query``` component.
```javascript
  render() {

    const handleJobFilter = (filteredJobs) => {
      this.setState({filteredJobs: filteredJobs});
    }
 

    return (
      <div className="App">
        <div className="title">
          <h1>Job Searcher</h1>
        </div>

        <div className="jobInfo">
          <Query 
            jobCompanies={this.state.jobCompanySet}
            jobs={this.state.allJobs}
            onJobFilter={handleJobFilter}
          /> 
        </div>
```

**8.** The ```jobCards``` div contains the list of jobs that were gathered from the ```API```. We use the ```map``` function to iterate through the list of jobs and create a ```JobCard``` component for each of the jobs, with the parameters acquired from the ```JSON``` object for each job.
```javascript
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
```

**9.** Finally, we add this line to *export* the ```App``` component for use in other React files. We will use the ```App``` component to display the majority of our application.
```javascript
export default App;
```

## Next Steps 
In this guide, we recommend deploying your front end to [Netlify](https://www.netlify.com/), which will build and deploy your React app for you! 
It also provides free SSL when you deploy (modern security standard for websites)! 

# Glossary
Below are some terms and jargon that are unique to React and are used thoughout our guide. We explain them briefly here, but if you would like to know more there are links to some great resources that go into more detail.
* [DOM](https://bitsofco.de/what-exactly-is-the-dom/): The Document Object Model (DOM for short) is an interface that represents how the HTML and XML documents are read by the browser. After the browser reads the HTML documents (like a wesbite for example), it creates a tree like structure of all the HTML elements in the document.
* [VDOM](https://programmingwithmosh.com/react/react-virtual-dom-explained/): A representation of the DOM (essentially a copy of the actual DOM). React uses the VDOM because it can manipulate it faster than the actual DOM. Any changes made to the VDOM are then reflected in the actual DOM, thus updating the website.
* [export](https://medium.com/@baintonw/importing-and-exporting-in-react-91bf7c3e5e45): You can export a function, variable, or component from a file so that it may be used in other components/files.
* [API](https://medium.com/swlh/api-for-dummies-232a5a48f950): An API (Application Programming Interface) is a set of functions that allows applications to access data and interact with external software components, operating systems, or microservices. To simplify, an API delivers a user response to a system and sends the system's response back to a user.
* [JSON](https://developers.squarespace.com/what-is-json#:~:text=JSON%2C%20or%20JavaScript%20Object%20Notation,content%20created%20with%20the%20CMS.): JSON is a readable and easily parsable data format that mimics JavaScript objects. It is often used to pass data between a server/API and a web application.
* [Components](https://www.w3schools.com/react/react_components.asp): Components are parts of the webpage UI split into independent and reusable pieces. The are built from HTML elements, JavaScript code, and CSS styling.
* [Callback functions](https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/): A callback function is an executable block of code that is passed in as an argument to another function or stored as a variable.
* [React lifecyle method](https://programmingwithmosh.com/javascript/react-lifecycle-methods/#:~:text=What%20are%20React%20lifecycle%20methods,birth%2C%20growth%2C%20and%20death.): A method that is triggered upon a certain stage within a React component's lifecycle. A component's lifecycle includes the time it was initialized, displayed, and terminated.
* [props](https://www.w3schools.com/react/react_props.asp): Any data that you pass to a functional component (where the functional component **cannot** change the data).
* [state](https://reactjs.org/docs/state-and-lifecycle.html): Any data that you pass to a class component (where the class component **can** change the data).
* [Hook](https://reactjs.org/docs/hooks-overview.html): A hook allows a functional component to manipulate data and use lifecycle methods like a class component can.
* [Component constructor](https://reactjs.org/docs/react-component.html): A constructor for a component allows the component to initialize its states and bind any methods. It is only run once when the component is initialized.
* [bind() method](https://codeburst.io/binding-functions-in-react-b168d2d006cb): When you bind a method, it tells that method which object to interact with.
* [HTTP Request](https://www.w3schools.com/tags/ref_httpmethods.asp#:~:text=HTTP%20works%20as%20a%20request,also%20contain%20the%20requested%20content.): A client/application can ask to apply actions on some data from the server using a HTTP request. Some types of HTTP requests include: GET, POST, PUT, etc.
* [Set](https://www.geeksforgeeks.org/sets-in-javascript/): A data structure where the data is ordered and is unique (no duplicates).
* [Ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator): Basically a one-line if statement. General syntax is: ```<condition> ? <expression if condition is true> : <expression if condition is false>```
