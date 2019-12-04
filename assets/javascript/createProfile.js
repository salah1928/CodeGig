document.getElementById('myform').addEventListener('submit',postprofile)
    
    function postprofile(e){
        e.preventDefault()

        var profileName = document.getElementById('profileName').value;
        var phoneNumber = document.getElementById('phoneNumber').value;
        var location = document.getElementById('location').value;
        var title = document.getElementById('title').value;
        var firstName = document.getElementById('firstName').value;
        var bio = document.getElementById('bio').value;
        
        

        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(this.status == 200){
                window.location.href = '/browsejobs'
            }else{
                console.log(this.responseText)
                let errors = JSON.parse(this.responseText)
                document.getElementById('profileName-error').innerHTML = errors.profileName ? errors.profileName : ""
                document.getElementById('location-error').innerHTML = errors.location ? errors.location : ""
                document.getElementById('phoneNumber-error').innerHTML = errors.phoneNumber ? errors.phoneNumber : ""
                document.getElementById('title-error').innerHTML = errors.title ? errors.title : ""
                document.getElementById('firstName-error').innerHTML = errors.firstName ? errors.firstName : ""
                document.getElementById('bio-error').innerHTML = errors.bio ? errors.bio : ""

            }
        }
        xhr.open('POST','http://localhost:5000/api/profiles',true);
        var tocken = localStorage.getItem('tocken');
        xhr.setRequestHeader('Authorization',tocken);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');

        xhr.send(`phoneNumber=${phoneNumber}&firstName=${firstName}&profileName=${profileName}&bio=${bio}&location=${location}&title=${title}`)
    }