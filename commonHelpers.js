import{a as b,S as q,i as P}from"./assets/vendor-b0d10f48.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const E="44373607-23d837ad960924b19f5bc44a0",$="https://pixabay.com/api/";async function g(e,o,i){const s=new URLSearchParams({key:E,q:e,page:o,per_page:i,image_type:"photo",orientation:"horizontal",safesearch:"true"}),t=`${$}?${s}`;try{const n=(await b.get(t,{params:s})).data;if(n.hits.length===0)throw new Error("No images found");return n}catch(r){throw new Error(r.message)}}let p;function v(e){const o=document.querySelector(".gallery"),i=e.map(s=>`
      <div class="photo-card">
        <a href="${s.largeImageURL}">
          <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <p class="info-title">Likes</p>
            <p class="info-value">${s.likes}</p>
          </div>
          <div class="info-item">
            <p class="info-title">Views</p>
            <p class="info-value">${s.views}</p>
          </div>
          <div class="info-item">
            <p class="info-title">Comments</p>
            <p class="info-value">${s.comments}</p>
          </div>
          <div class="info-item">
            <p class="info-title">Downloads</p>
            <p class="info-value">${s.downloads}</p>
          </div>
        </div>
      </div>
    `).join("");o.insertAdjacentHTML("beforeend",i),p?p.refresh():p=new q(".gallery a",{captionsData:"alt",captionDelay:250})}function l(e){P.error({title:"Error",message:e})}function w(e){e.classList.remove("active")}function c(e){e.classList.add("active")}function L(e){e.classList.remove("hidden")}function h(e){e.classList.add("hidden")}function M(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}const y=document.querySelector(".search-form"),I=document.querySelector('input[name="query"]'),O=document.querySelector(".gallery"),d=document.getElementById("loader"),a=document.querySelector(".btn-load-more");let f="",u=1,S=1,m=15;y.addEventListener("submit",async e=>{if(e.preventDefault(),f=I.value.trim(),f===""){l("Please enter a search query."),c(a);return}u=1,L(d),c(a),O.innerHTML="";try{const o=await g(f,u,m);if(S=Math.ceil(o.totalHits/m),o.hits.length===0){l("Sorry, there are no images matching your search query. Please try again!"),h(d);return}v(o.hits),o.totalHits>m?w(a):c(a)}catch{l("Something went wrong. Please try again later.")}finally{h(d)}y.reset()});a.addEventListener("click",async()=>{u++,c(a),L(d);try{const e=await g(f,u,m);if(e.hits.length===0){l("No more images found");return}v(e.hits),u<S?w(a):c(a)}catch{l("Something went wrong. Please try again later.")}finally{h(d),M()}});
//# sourceMappingURL=commonHelpers.js.map
