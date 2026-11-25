/* header, menu mobile, apparitions */
const hdr=document.getElementById('hdr');
const onScroll=()=>hdr.classList.toggle('scrolled',scrollY>40||document.body.classList.contains('inner'));
addEventListener('scroll',onScroll,{passive:true});onScroll();
document.querySelector('.burger').onclick=()=>{hdr.classList.toggle('open');document.body.style.overflow=hdr.classList.contains('open')?'hidden':''};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
document.querySelectorAll('[data-m]').forEach(el=>el.addEventListener('click',()=>location.href='atelier.html?m='+el.dataset.m));

/* filigrane « maquette » : présent sur toutes les pages, ne bloque aucun clic */
(function(){
  const wm=document.createElement('div');
  wm.className='watermark';wm.setAttribute('aria-hidden','true');
  wm.innerHTML='<span>Prototipo</span>'; /* toujours en italien */
  const tag=document.createElement('div');
  tag.className='mockup-flag';
  tag.textContent='Maquette · site non officiel';
  document.body.append(wm,tag);
  if(typeof applyLang==='function')applyLang();
})();
