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

const express = require('express');
const projectData = require('./modules/projects');

const app = express(); 
const HTTP_PORT = process.env.PORT || 8080;

// Student information
const studentInfo = {
    name: "John Bista",
    studentId: "153185236"
};

projectData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server running on http://localhost:${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to initialize data:', err);
    });

app.get('/', (req, res) => {
    res.send(`Assignment 2: ${studentInfo.name} - ${studentInfo.studentId}`);
});

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

app.get('/solutions/projects/sector-demo', (req, res) => {
    projectData.getProjectsBySector('ind')
        .then(projects => {
            res.json({
                ...studentInfo,
                timestamp: new Date().toISOString(),
                data: projects
            });
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

