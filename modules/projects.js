const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];


function initialize() {
    return new Promise((resolve, reject) => {
        if (!projectData || !sectorData || projectData.length === 0 || sectorData.length === 0) {
            return reject("We couldn't find the project or sector data. Please check.");
        }
        
        projects = [];
        projectData.forEach(project => {
            const sector = sectorData.find(sec => sec.id === project.sector_id);
            let projectWithSector = { ...project, sector: sector ? sector.sector_name : "Unknown" };
            projects.push(projectWithSector);
        });
        
        resolve();  // Resolve promise after processing is complete
    });
}

initialize()
    .then(() => {
        console.log("Projects have been successfully initialized", projects);
    })
    .catch((error) => {
        console.error("Error initializing projects:", error);
    });


function getAllProjects(){
    return new Promise((resolve,reject) => {
        if (projects.length >0) {
            resolve(projects);
        }else {
            reject('No Projects have been found.');
        }
    });
}

function getProjectById(projectId){
    return new Promise((resolve, reject) => {
        let found = projects.find((p) => p.id === projectId);
        if (found) {
            resolve(found);
        } else {
            reject('Project was not found.');
        }

    });
}


function getProjectsBySector(projectSector){
    return new Promise((resolve, reject) => {
        let foundProjects = projects.filter((p)=>{
            p.sec.toLowerCase().includes(projectSector.toLowerCase());

        });
        if (foundProjects.length === 0) {
            resolve(foundProjects);
        } else{
            reject('No Projects were found that were entered');
        }
    })
}


module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };