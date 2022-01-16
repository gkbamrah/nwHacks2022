let token = 

function getCourses() {
    let url = 'https://canvas.ubc.ca/api/v1/courses'
    let courses = [];
    return new Promise((resolve) => {
        fetch(url).then(response => response.json()).then((data) => {
            for (let course of data) {
                if (course.name) {
                    courses.push([course.id, course.name]);
                }
            }
            return resolve(courses);
        });
    });
}

function getAllAssignments(courses) {
    let promises = [];

    for (let course of courses) {

        promises.push(getAssignments(course[0]));
    }

    return Promise.all(promises).then(allAssignments => {

        return allAssignments;
    })
}

function getAssignments(courseId) {
    let assignments = [];
    let url = 'https://canvas.ubc.ca/api/v1/courses/' + courseId + '/assignments';
    return new Promise((resolve) => {
        fetch(url).then(response => response.json()).then((data) => {
            for (let assignment of data) {
                if (assignment.due_at) {
                    assignments.push([assignment.name, assignment.due_at,courseId])
                }
            }

            return resolve(assignments);
        });
    });
}

function start() {
    return getCourses().then((courses) => {
        return getAllAssignments(courses).then((allAssignments) => {
            return addTasks(allAssignments);
        });
    });
}

start();



function addTasks(tasks){
    for(let task of tasks){
        if(task.length>0){
            for(let ass of task){
                addTask(ass[0],ass[1],ass[2])
                console.log(ass[1])
            }
        }
    }
}

function addTask(name,timedate,id){
    console.log(name)
    console.log(timedate)
    addSection(id)
    fetch('https://api.todoist.com/rest/v1/tasks',{
    method: 'POST',
    body : JSON.stringify({"content":name,"due_datetime":timedate,"section_id":id}),
    headers:{
        "Content-Type": "application/json",
        "X-Request-Id": "$(uuidgen)",
        "Authorization": "Bearer " + token
    }
    }).then(response => response.json()).then((data) => console.log(data))
}
