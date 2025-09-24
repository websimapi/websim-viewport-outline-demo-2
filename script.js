/* ...existing code... */
/*
  Minimal script to ensure the frame stays perfectly aligned on mobile when address bars
  show/hide. We set the height to the dynamic viewport unit (100vh can be unreliable).
*/
(function(){
  const frame = document.getElementById('viewport-frame');
  if(!frame) return;

  function update() {
    // Use the CSS env(safe-area-inset-*) for notch devices and the visualViewport height
    const vv = window.visualViewport;
    if (vv) {
      // position using visualViewport to match the visible viewport area
      const left = vv.offsetLeft || 0;
      const top = vv.offsetTop || 0;
      frame.style.transform = `translate(${left}px, ${top}px)`;
      frame.style.width  = `${vv.width}px`;
      frame.style.height = `${vv.height}px`;
    } else {
      // fallback to full window
      frame.style.transform = '';
      frame.style.width = '';
      frame.style.height = '';
    }
  }

  // update on resize/scroll/viewport change
  ['resize','orientationchange'].forEach(ev => window.addEventListener(ev, update, {passive:true}));
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', update, {passive:true});
    window.visualViewport.addEventListener('scroll', update, {passive:true});
  }
  // initial
  update();
})();

