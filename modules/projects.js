const projectData = require("../data/projectData"); //importing project data
const sectorData = require("../data/sectorData"); //importing sector data

let projects = []; //creating an empty array to store project data with sector data

//initializing functions
function initialize() {
    return new Promise((resolve, reject) => {
        //check if the array is empty
        if (!projectData || !sectorData || projectData.length === 0 || sectorData.length === 0) {
            return reject("We couldn't find the project or sector data. Please check.");
        }
        
        projects = []; //reset array before adding the data from project data and sector data
        //loop for project data that is corresponding to sector data
        projectData.forEach(project => {
            const sector = sectorData.find(sec => sec.id === project.sector_id);
            let projectWithSector = { ...project, sector: sector ? sector.sector_name : "Unknown" };
            projects.push(projectWithSector);
        });
        
        resolve();  // Resolve promise 
    });
}

// initialize project to handle success or failure
initialize()
    .then(() => {
        console.log("Projects have been successfully initialized", projects);
    })
    .catch((error) => {
        console.error("Error initializing projects:", error);
    });

//function to get all the project data
function getAllProjects(){
    return new Promise((resolve,reject) => {
        if (projects.length >0) {
            resolve(projects);
        }else {
            reject('No Projects have been found.');
        }
    });
}

//function to get project by id
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

//function to get project by sector
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

//export all the functions
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };