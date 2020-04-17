const spinnerBox = document.getElementById('spinner-box');
const XHR = new XMLHttpRequest();

XHR.onloadstart = function (e) {
  console.log('cargando...');
  spinnerBox.classList.replace('hidden', 'show');
}
XHR.onloadend = function (res) {
  console.log(res);
  spinnerBox.classList.replace('show', 'hidden');
  renderData(res.target.response);
}
XHR.responseType = 'json';
XHR.open('get', '../controller/listDir.php');
XHR.send();


const outputHtml = document.getElementById('output');

function renderData(data) {
  for (const fileType in data) {
    if (data.hasOwnProperty(fileType)) {
      
      var ol = document.createElement('ol');
      var heading = document.createElement('h3');
      heading.textContent = fileType;
      ol.appendChild(heading);
      
      data[fileType].forEach(fileInfo => {       
        var li = document.createElement('li');
        var a = document.createElement('a');
        var icon = document.createElement('i');
        var name = document.createElement('span');
        a.href = `../download/?file_code=${fileInfo.code}`;
        a.addEventListener("click", eventHandler, false);
        icon.setAttribute('class', setIcon(fileInfo.mime));
        name.textContent = fileInfo.name;
        a.appendChild(icon);
        a.appendChild(name);
        li.appendChild(a);
        ol.appendChild(li);
      });
      outputHtml.appendChild(ol);
    }
  }
}
function setIcon(mime) {  
  if (mime.indexOf("video") != -1) {
    return "fa fa-film";
  } else if (mime.indexOf("image") != -1) {
    return "fa fa-image";
  } else if (mime.indexOf("audio") != -1) {
    return "fa fa-music";
  } else if (mime.indexOf("pdf") != -1){
    return "fa fa-file-pdf-o";
  } else {
    return "fa fa-file-text-o"
  }
}
function eventHandler(e) {
  // e.preventDefault();
}