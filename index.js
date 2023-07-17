const API_KEY="7d1632fada824725892e2cf2c0caf3d7";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=>fetchNews("India"));

async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await response.json();
    bindArticles(data.articles);
}

function bindArticles(articles){
    const cardCont = document.getElementById('card-container');
    const cardTemplate=document.getElementById('temp-news-card');
    cardCont.innerHTML="";
    let count=0;
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        // if(!article.title) return;
        if(count>20) return;
        const cloneOfCard=cardTemplate.content.cloneNode(true);
        appendData(cloneOfCard, article);
        cardCont.appendChild(cloneOfCard);
        count++;
    });
}
function appendData(cloneOfCard, article){
    const newsImg=cloneOfCard.querySelector('#news-img');
    const newsTitle=cloneOfCard.querySelector('#news-title');
    const newsSrc=cloneOfCard.querySelector('#news-source');
    const newsDesc=cloneOfCard.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US", {timeZone:"Asia/Jakarta",});
    newsSrc.innerHTML=`${article.source.name}  •  ${date}`;
    //newsSrc.innerHTML=article.source.name;
    cloneOfCard.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}
let selectedNav=null;
function onNavItem(query){
    fetchNews(query);
    const navItem=document.getElementById(query);
    selectedNav?.classList.remove('selected');
    selectedNav=navItem;
    selectedNav.classList.add('selected');
}

const searchButton=document.getElementById('search-button');
const input=document.getElementById('search-text');

searchButton.addEventListener("click", ()=>{
    const query=input.value;
    if(!query) return;
    fetchNews(query);
    selectedNav?.classList.remove('selected');
    selectedNav=null;
})

function socialMedia(id){
    if(id==="github"){
        window.open("https://github.com/ShrutiKishore15", "_blank");
    }
    else{
        window.open("https://www.linkedin.com/in/shruti-kishore-ba474222a", "_blank");
    }
}