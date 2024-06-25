import{a as P,S as M,i as L}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const $="44373607-23d837ad960924b19f5bc44a0",H="https://pixabay.com/api/";async function w(e,r,n){const s=new URLSearchParams({key:$,q:e,page:r,per_page:n,image_type:"photo",orientation:"horizontal",safesearch:"true"}),t=`${H}?${s}`;try{const i=(await P.get(t,{params:s})).data;if(i.hits.length===0)throw new Error("No images found");return i}catch(o){throw new Error(o.message)}}let p;function S(e){const r=document.querySelector(".gallery"),n=e.map(s=>`
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
    `).join("");r.insertAdjacentHTML("beforeend",n),p?p.refresh():p=new M(".gallery a",{captionsData:"alt",captionDelay:250})}function b(e,r,n){e>=r?(h(n),r&&L.info({title:"The End!",message:"We're sorry, but you've reached the end of search results."})):E(n)}function l(e){L.error({title:"Error",message:e})}function E(e){e.classList.remove("active")}function h(e){e.classList.add("active")}function q(e){e.classList.remove("hidden")}function y(e){e.classList.add("hidden")}function T(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}const v=document.querySelector(".search-form"),I=document.querySelector('input[name="query"]'),u=document.querySelector(".gallery"),d=document.getElementById("loader"),a=document.querySelector(".btn-load-more");let f="",c=1,m=1,g=15;v.addEventListener("submit",async e=>{if(e.preventDefault(),f=I.value.trim(),f===""){l("Please enter a search query."),h(a);return}c=1,q(d),h(a),u.innerHTML="";try{const r=await w(f,c,g);if(m=Math.ceil(r.totalHits/g),m===0){l("Empty Result"),y(d),b(c,m,a);return}if(r.hits.length===0){u.innerHTML="",l("Sorry, there are no images matching your search query. Please try again!");return}E(a),S(r.hits)}catch{u.innerHTML="",l("Something went wrong. Please try again later.")}finally{y(d)}v.reset()});a.addEventListener("click",async()=>{c++,h(a),q(d);try{const e=await w(f,c,g);if(e.hits.length===0){l("No more images found");return}S(e.hits)}catch{u.innerHTML="",l("Something went wrong. Please try again later.")}finally{y(d),b(c,m,a),T()}});
//# sourceMappingURL=commonHelpers.js.map
