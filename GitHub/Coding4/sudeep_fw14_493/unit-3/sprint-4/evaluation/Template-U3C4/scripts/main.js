async function apiCall(url) {


    //add api call logic here

    let res = await fetch(url);
    let data = await res.json();
    return data.articles;
}


function appendArticles(articles, main) {
    var total;
    articles.map(function(elem){

  
    //add append logic here
   total = document.createElement("div");
   total.addEventListener("click",function(){
       var data = elem;
    localStorage.setItem("news",JSON.stringify(data));
       window.location.href="./news.html";
   })
  var mains=document.createElement("div");
  var img = document.createElement("img");
  img.src= elem.image;
  var title = document.createElement("h3");
  title.innerText=elem.title;
  var small=document.createElement("div");
  var desc=document.createElement("p");
  desc.textContent=elem.description;    
    small.append(desc);
    mains.append(img,title);
    
    
    total.append(mains,small);
    main.append(total);
    })
  
}

export { apiCall, appendArticles }