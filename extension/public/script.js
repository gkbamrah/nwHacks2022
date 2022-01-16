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
    console.log(courses);
    for (let course of courses) {
        console.log(course.id);
        promises.push(getAssignments(course[0]));
    }

    return Promise.all(promises).then(allAssignments => {
        console.log(allAssignments);
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
                    assignments.push([assignment.name, assignment.due_at])
                }
            }
            console.log(assignments);
            return resolve(assignments);
        });
    });
}

function start() {
    return getCourses().then((courses) => {
        return getAllAssignments(courses);
    });
}

start();