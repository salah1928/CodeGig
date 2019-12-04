
        document.getElementById('myform').addEventListener('submit',postppost)
        function postppost(e){
            e.preventDefault()
            var title = document.getElementById('title').value;
            var description = document.getElementById('description').value;

            var amount = document.getElementById('ammount').value;
            var currency = document.getElementById('currency').value;

            var price = `${amount} ${currency}`

            var payment = document.getElementById('payment').value;

            var location = document.getElementById('location').value;
            
            var technologies = [];
            
            var checkboxes = document.getElementsByClassName("checkboxes")
            var checkboxesChecked =[]
            for (var i=0; i<checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                   technologies.push(checkboxes[i].name);
                }
             }
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(this.status == 401){
                    document.getElementById("noacc").innerHTML = `You must be connected to post a job. <a href="/login">login</a> <a href="/register">register</a>`
                    return
                }
                if(this.status == 200){
                    window.location.href='/browsejobs'

                
                }else{
                    console.log(this.responseText)
                    let errors = JSON.parse(this.responseText)
                    document.getElementById('title-error').innerHTML = errors.title ? errors.title : ""
                    document.getElementById('technologies-error').innerHTML = errors.technologies ? errors.technologies : ""
                    document.getElementById('description-error').innerHTML = errors.description ? errors.description : ""
    
                }
            }
            xhr.open('POST','http://localhost:5000/api/posts',true);
            var tocken = localStorage.getItem('tocken');
            xhr.setRequestHeader('Authorization',tocken);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    
            xhr.send(`title=${title}&payment=${payment}&location=${location}&technologies=${[technologies]}&description=${description}&price=${price}`)
        }
        const content = document.getElementById("showmore")
        const btn = document.getElementById("showmore-btn")

        function showmore(){
            content.classList.toggle('hidden')
            var btnT = btn.innerHTML;
            if(btnT == "show more"){
                btn.innerHTML = "show less"
            }else{
                btn.innerHTML = "show more"
            }
        }