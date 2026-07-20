// theme toggle
(function(){
  var root=document.documentElement, btn=document.getElementById('themeToggle');
  if(btn) btn.addEventListener('click',function(){
    var cur=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    root.setAttribute('data-theme',cur==='dark'?'light':'dark');
  });
  // scroll reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.06});
  document.querySelectorAll('section,.cs-section,.case,header.hero,.work-card').forEach(function(el){el.classList.add('fade');io.observe(el);});

  // lightbox: click any .shot img to expand
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbImg=lb.querySelector('img'), lbCap=lb.querySelector('.lb-cap');
    function open(src,cap){lbImg.src=src;lbCap.textContent=cap||'';lb.classList.add('open');document.body.style.overflow='hidden';}
    function close(){lb.classList.remove('open');lbImg.src='';document.body.style.overflow='';}
    document.addEventListener('click',function(e){
      var img=e.target.closest('.shot img');
      if(img){var fig=img.closest('figure');var cap=fig?fig.querySelector('figcaption'):null;open(img.currentSrc||img.src,cap?cap.textContent:'');}
    });
    lb.addEventListener('click',function(e){ if(e.target!==lbImg) close(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  }
})();
