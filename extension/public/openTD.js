let todoist = document.getElementById("tasks")
todoist.onclick = function () {
    chrome.tabs.create({active: true, url: 'https://todoist.com/app/inbox'});
}