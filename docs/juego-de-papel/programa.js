const e=document.getElementById("video"),o=document.getElementById("resultados"),t=document.getElementById("opcion1"),n=document.getElementById("opcion2"),l=document.querySelectorAll(".opcion"),s={fucsia:{},anaranjado:{},verde:{},azul:{},rosado:{},rojo:{},amarillo:{},morado:{}},i=Object.keys(s).length;let a=!1,c=0;function d(e){o.appendChild(e.target),c++,c===i&&r()}console.log(e);for(let o in s){const t=new Image;t.id=o,t.className="resultado",t.onload=d,t.src=`https://juancgonzalez.com/labmoviles/juego-de-papel/resultados/${o}.jpg`,t.onclick=()=>{t.style.display="none",e.play()},s[o].img=t}function r(){const l=[928,614],s=Math.min(window.innerWidth/l[0],window.innerHeight/l[1]),i={width:`${l[0]*s}px`,height:`${l[1]*s}px`};Object.assign(e.style,i),Object.assign(t.style,i),Object.assign(n.style,i),Object.assign(o.style,i)}l.forEach((e=>{e.onclick=()=>{t.style.display="none",n.style.display="none",s[e.dataset.color].img.style.display="block"}})),e.onclick=o=>{if(a){const o=e.currentTime;o<.5||(o>=.5&&o<1?(e.pause(),t.style.display="block"):o>=1&&o<1.5||o>=1.5&&o<2&&(e.pause(),n.style.display="block"))}else e.play(),a=!0},e.ontimeupdate=function(){const o=e.currentTime;a&&(o<.5?(console.log("working"),e.style.cursor="default"):e.style.cursor=o>=.5&&o<1?"pointer":o>=1&&o<1.6?"default":o>=1.6&&o<2?"pointer":"default")},window.onresize=r;
//# sourceMappingURL=programa.js.map
