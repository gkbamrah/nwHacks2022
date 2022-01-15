console.log("hEY");

url = 'https://canvas.ubc.ca/api/v1/courses/86703/assignments'

fetch(url).then(response => response.json()).then(data => console.log(data))

// application , wrapper,main,not_right_side,
// content-wrapper , content ,assignmentGroups
// collectionViewItems ig-list , 
// item-group-condensed
// assignment_group_past_assignments
// collectionViewItems ig-list draggable
// assignment sort-disabled search_show