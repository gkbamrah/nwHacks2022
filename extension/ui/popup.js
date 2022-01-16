var myNodelist = document.getElementsById("task");
var i;

for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.id == 'task') {
    ev.target.classList.toggle('checked');
  }
}, false);

function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
  }