    document.getElementById('myform').addEventListener('submit',postName)
    
    function postName(e){
      e.preventDefault();

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      
      var xhr = new XMLHttpRequest();
      xhr.onload = function(){
        
        if(this.status==200){
            const succes = JSON.parse(this.responseText)
            localStorage.setItem('tocken',succes.tocken)
            window.location.href = '/browsejobs';
            // let url = "http://localhost:5000/api/profiles"
            // let token = succes.tocken
            // let h = new Headers();

            // h.append('Authorization',token)

            // let req = new Request(url,{
            //   method:'GET',
            //   mode:"cors",
            //   headers:h
            // })
            // fetch(req)
            // .then(res =>res.json()).then(data=>console.log(data))
            
        }else{
            const errors = JSON.parse(this.responseText)
            document.getElementById('email-error').innerHTML = errors.email ? errors.email : ""
            document.getElementById('password-error').innerHTML =  errors.password ? errors.password : ""
        }
      }
      xhr.open('POST', 'http://localhost:5000/api/users/login', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     
      xhr.send(`email=${email}&password=${password}`);
    }
    
