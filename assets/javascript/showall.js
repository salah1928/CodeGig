// import highlight from "./sketch.js"
const content = document.getElementById("showmore")
const btn = document.getElementById("showmore-btn")
const results = document.getElementById("results")
const settingsBtn = document.getElementById("search-settings")
const left = document.getElementById('left')

var checkboxes = document.getElementsByClassName("checkboxes");

var searchBar = document.getElementById("search-input")

// checkboxes.addEventListener('input',changed())
// function changed(){
//     alert('changed')
// }
// var checkboxesChecked =[]

// for (var i=0; i<checkboxes.length; i++) {
//     // And stick the checked ones onto an array...
//              if (checkboxes[i].checked) {
//                    technologies.push(checkboxes[i].name);
//                 }
//              }



var posts = []
function toggleSettings(){
    left.classList.toggle('shown')
}

function showmore(){
    content.classList.toggle('hidden')
    var btnT = btn.innerHTML;
    if(btnT == "show more"){
        btn.innerHTML = "show less"
    }else{
        btn.innerHTML = "show more"
    }
}

async function getposts() {
    const res = await fetch('/api/posts/all').catch(err=>console.log(err));
    const posts = await res.json();
    document.getElementById('search-form').reset()
    document.getElementById('left-form').reset()
    
    display(posts)
    }


    const searchPosts = async searchText =>{
    const res = await fetch('/api/posts/all')
    
    const posts = await res.json()

    let matches = posts.filter(post=>{
        const regex = new RegExp(`${searchText}`,'gi')
        
        return post.title.match(regex) || post.description.match(regex) ;
    })
    if(searchText === 0){
        match = []
    }
    display(matches,searchText)
   }

searchBar.addEventListener('input',()=>searchPosts(searchBar.value))


 const applyFilters = async () =>{
    let technologies = ""
    let ammount = document.getElementById('ammount').value
    let currency = document.getElementById('currency').value
    let price = `${ammount} ${currency}`
    
    
    let payment = document.getElementById('payment').value
    
    let location = document.getElementById('location').value
    
    var checkboxes = document.getElementsByClassName("checkboxes")
    var checkboxesChecked =[]
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
           technologies += "," + checkboxes[i].name;
        }
     }
     
     
     if(technologies == ""){
       technologies = "*"
     }
     if(price == " " ){
       price = "*"
     }
     if(location == ""){
       location = "*"
     }
     if(payment == ""){
       payment = "*"
     }
    
     
     
    if ( technologies !== "*" ) {
        const res = await fetch(`/api/posts/filterBy/${technologies}/${price}/${location}/${payment}`)
        const posts = await res.json()
   
       
       display(posts)
       return
    }
    
    const res = await fetch(`/api/posts/filter/${price}/${location}/${payment}`)
    const posts = await res.json()

   
   display(posts)
    
 }

function display(posts,searchValue){
    var output = ''
         
    for (var i in posts) {
        var technologies = ''
        var techs = posts[i].technologies
        for(var v in techs){
             technologies += `${techs[v]},`
        }
        
        
        var fulldate = posts[i].date.toString()
         
         
         var day = fulldate.substring(8, 10);                 
         var month = fulldate.substring(5, 7);
         var year = fulldate.substring(0, 4);

         var months = ["n","January","February","March","April","May","June","July","August","September","October","November","December"]
        
         var date = ` ${day}th ${months[month]} ${year}`

        
        //  if(searchValue){
        //     const regex = new RegExp(`${searchValue}`,'gi')
        //     var title = posts[i].title.replace(regex,replacer)
        //     console.log(title);
        //     function replacer(match){
        //        const highlighted =  highlight(match)
        //        return highlighted
        //     }
        //  }
     
        var v = posts[i].description.slice(0,40)
    

         output += `
         <div id="res">
         <div class="post">
            <div><h3>${posts[i].title}</h3>
            <h5>${v}...</h5>
            <div id="btm-pst">
            <h6>${date}</h6>
            <h6>${technologies}</h6></div>
            </div>
            <div><p>${posts[i].price }</p></div>    
            <div id="see-more"><a href="/api/posts/${posts[i]._id}">more</a></div>            
        </div>
        </div>
         `        
                
    }
    
    results.innerHTML = output;       
    
}
const up = document.getElementById('up')

var v = {
    root:null,
    rootMargin:'100%',
    threshold:1
}
var scrollObserver = new IntersectionObserver(

  function(ee,observer){
    ee.forEach(e=>{
        
        up.classList.toggle('hidden')
    })
} ,v)
scrollObserver.observe(left)

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }