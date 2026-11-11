(function(){
  var root=document.documentElement;
  // resume mode: only on the /resume/ link (or ?resume), remembered for the tab
  var cv=false;
  try{ if(/[?&]resume\b/.test(location.search)) sessionStorage.setItem('cvMode','1'); cv=sessionStorage.getItem('cvMode')==='1'; }catch(e){ cv=/[?&]resume\b/.test(location.search); }
  if(cv){
    var me=document.querySelector('script[src$="site.js"]');
    var pdf=me.getAttribute('src').replace('site.js','Cherechi_Daniella_Orika_Resume.pdf');
    function rl(cls,txt){var a=document.createElement('a');a.className=cls;a.href=pdf;a.target='_blank';a.rel='noopener';a.setAttribute('download','');a.textContent=txt;return a;}
    var nav=document.querySelector('.nav-links .cta');
    if(nav) nav.parentNode.insertBefore(rl('','Resume'),nav);
    document.querySelectorAll('.btns').forEach(function(b){
      var first=b.querySelector('.btn.primary');
      var a=rl('btn','Download resume');
      if(first&&first.nextSibling) b.insertBefore(a,first.nextSibling); else b.appendChild(a);
    });
  }

  // scroll reveal
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.05});
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('fade');io.observe(el);});
  }

  // case-study table of contents: highlight current block
  var links=[].slice.call(document.querySelectorAll('.toc a'));
  if(links.length && 'IntersectionObserver' in window){
    var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on');});var a=map[e.target.id];if(a)a.classList.add('on');}
    });},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('.block[id]').forEach(function(b){spy.observe(b);});
  }

  // STAR progress nav
  var sl=[].slice.call(document.querySelectorAll('.star-nav a'));
  if(sl.length && 'IntersectionObserver' in window){
    var sm={};sl.forEach(function(a){sm[a.getAttribute('href').slice(1)]=a;});
    var sp=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){sl.forEach(function(a){a.classList.remove('on');});var a=sm[e.target.id];if(a)a.classList.add('on');}
    });},{rootMargin:'-35% 0px -55% 0px'});
    document.querySelectorAll('.chapter[id]').forEach(function(c){sp.observe(c);});
  }

  // lightbox
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbImg=lb.querySelector('img'),lbCap=lb.querySelector('.lb-cap');
    function open(src,cap){lbImg.src=src;lbCap.textContent=cap||'';lb.classList.add('open');document.body.style.overflow='hidden';}
    function close(){lb.classList.remove('open');lbImg.removeAttribute('src');document.body.style.overflow='';}
    document.addEventListener('click',function(e){
      var img=e.target.closest('.shot img, .cover img, .frame img');
      if(img){var fig=img.closest('figure');var cap=fig&&fig.querySelector('figcaption');open(img.getAttribute('data-full')||img.currentSrc||img.src,cap?cap.textContent:'');}
    });
    lb.addEventListener('click',function(e){if(e.target!==lbImg)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
})();
