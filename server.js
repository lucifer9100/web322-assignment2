/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: John Bista Student ID: 153185236 Date: 2025/02/2025
*
********************************************************************************/

const express = require('express'); //importing express framework
const projectData = require('./modules/projects'); //importing projectdata module

const app = express(); 
const HTTP_PORT = process.env.PORT || 8080; //defining server port

// Student information
const studentInfo = {
    name: "John Bista",
    studentId: "153185236"
};

//initializing project data and starting the server when it is ready
projectData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server running on http://localhost:${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize data:', err);
    });

//root route
app.get('/', (req, res) => {
    res.send(`Assignment 2: ${studentInfo.name} - ${studentInfo.studentId}`);
});

// route used to get all the projects
app.get('/solutions/projects', (req, res) => {
    projectData.getAllProjects()
        .then(projects => {
            res.json({
                ...studentInfo,
                timestamp: new Date().toISOString(),
                data: projects
            });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

//route to get project by id
app.get('/solutions/projects/id-demo', (req, res) => {
    projectData.getProjectById(10)
        .then(project => {
            res.json({
                ...studentInfo,
                timestamp: new Date().toISOString(),
                data: project
            });
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

//route to get project by sector name
app.get('/solutions/projects/sector-demo', (req, res) => {
    projectData.getProjectsBySector('industry')
        .then(projects => {
            res.json({
                ...studentInfo,
                timestamp: new Date().toISOString(),
                data: projects
            });
        })
        .catch(err => {
            res.status(404).send(err); //sending error if no project is found with the given sector name
        });
});

