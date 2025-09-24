/* ...existing code... */
(function(){
  const frame = document.getElementById('viewport-frame');
  if(!frame) return;

  const slider = document.getElementById('width-slider');
  const valueDisplay = document.getElementById('width-value');

  function updateBorder(){
    const w = slider.value;
    frame.style.borderWidth = `${w}px`;
    valueDisplay.textContent = w;
  }

  slider.addEventListener('input', updateBorder);
  updateBorder();

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