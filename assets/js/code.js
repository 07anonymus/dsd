const labelProgress = document.getElementById(('label-progress'));
const cancel = document.getElementById('cancel');
var form = document.getElementById('form');
var details = document.getElementById('details');
var btnFiles = form.file;
var doingRequest = false;

function upload(file, progressBar, progressText) {

  var request = new XMLHttpRequest();
  
  request.addEventListener('abort', (event) => {
  	labelProgress.removeAttribute('hidden');
    labelProgress.textContent = `Subida del archivo ${file.get('file').name}: cancelado`;
    cancel.setAttribute('hidden', true);
    progressText.setAttribute('class', 'error fa fa-stop-circle-o');
    progressText.textContent = '';
    //progressText = null;
    doingRequest = false;
  })

  request.upload.addEventListener('progress', (event) => {
    let percent = Math.round((event.loaded / event.total) * 100);
    progressBar.value = percent / 100;
    progressText.textContent = `${percent}%`;
    
  });

  request.addEventListener('loadend', (res) => {
    cancel.setAttribute('hidden', true);
    progressText.textContent = "";
		console.log(request.response);
    doingRequest = false;
    
    if(res.target.status == 200 && res.target.response[0]) {
      //details.innerHTML += request.response;
      console.log(res.target);
    	progressText.setAttribute('class', 'success fa fa-check-circle-o');    	
    } else {
    	progressText.setAttribute('class', 'error fa fa-warning');
    	// details.innerHTML += "Error muy grave, por favor comunique este error al administrador del sitio.<br>CODE: 000x21 MESSAGE: Carpeta de almacenamiento no encontrada <br>";
    }
    progressText = null;
  })
  
  request.responseType = 'json';
  cancel.removeAttribute('hidden');
  progressText.setAttribute('class', 'success');
  request.open('post', '../controller/upload.php');
  request.send(file);
	
  cancel.addEventListener('click', (e) => {
    request.abort();
  })
}

form.addEventListener('change', (e) => {
  e.preventDefault();

  var olFileStatus = document.getElementById('fileStatus');
  var fd = new FormData(this.form);
  
  olFileStatus.innerHTML = '';

  fd.forEach(function (e, s, t) {
    const liFileStatus = document.createElement('li');
    const icon = document.createElement('i');
    const filename = document.createElement('span');
    const progressBox = document.createElement('div');
    const progressBar = document.createElement('progress');
    const progressText = document.createElement('span');
    
    liFileStatus.setAttribute('id', e.name);
    icon.setAttribute('class', 'fa fa-file-o');
    filename.textContent = e.name;
    progressBox.setAttribute('class', 'progressBox');
    progressBox.setAttribute('hidden', true);
    progressText.textContent = '0%';

    olFileStatus.appendChild(liFileStatus);
    liFileStatus.appendChild(icon);
    liFileStatus.appendChild(filename);
    liFileStatus.appendChild(progressBox);
    progressBox.appendChild(progressBar);
    progressBox.appendChild(progressText);
    
  })
  
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  var fd = new FormData(this.form);
  if (!fd.getAll('file')[0].name == "") {

    fd.forEach((file) => {
      const post = new FormData();
      post.append("file", file);
      
      var parentProgressBox = document.getElementById(file.name);
      var progressBox = parentProgressBox.children[2];
      var progressBar = progressBox.children[0];
      var progressText = progressBox.children[1];
      
      progressBox.removeAttribute('hidden');

      checkRequests(post, progressBar, progressText);
    })

  } else {
    window.alert('No hay archivos seleccionados')
  }

})

function checkRequests(post, progressBar, progressText) {
	
	if (!doingRequest) {
		doingRequest = true;
		upload(post, progressBar, progressText);
	} else {
		setTimeout(() => {
      checkRequests(post, progressBar, progressText);
    }, 600);
	}
}
