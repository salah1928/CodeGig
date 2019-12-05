
    document.getElementById('myform').addEventListener('submit',postName);
    
    function postName(e){
      e.preventDefault();

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
     
      var password2 = document.getElementById('password2').value;
      
      var xhr = new XMLHttpRequest();
      xhr.onload = function(){
        
        if(this.status==200){
          window.location.href = '/login';
          
            
        }else{
            const errors = JSON.parse(this.responseText)
            document.getElementById('email-error').innerHTML = errors.email ? errors.email : ""
            if(errors.email){
              document.getElementById('email').classList.add('errors')
              
            }
            document.getElementById('password-error').innerHTML =  errors.password ? errors.password : ""
            document.getElementById('password2-error').innerHTML = errors.password2 ? errors.password2 : ""
        }
      }
      xhr.open('POST', '/api/users/register', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     
      xhr.send(`email=${email}&password=${password}&password2=${password2}`);
    }
    
