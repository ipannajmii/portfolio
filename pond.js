/* THE THINKING POND — no packages, framework or external services required.
 * Learning order: (1) board, (2) portfolio content, (3) pond objects, (4) water.
 */
'use strict';

// 1. CHESSBOARD: the five light pieces are shortcuts to portfolio content.
const pieces = {
  king: '<path d="M32 6v13m-6-7h12M23 24c0-10 18-10 18 0 8-4 14 3 10 11L42 52H22L13 35c-4-8 2-15 10-11Z"/><path d="M23 51h18l5 11H18Z"/>',
  queen: '<path d="m13 24 8 23h22l8-23-11 9-8-17-8 17Z"/><circle cx="12" cy="21" r="4"/><circle cx="32" cy="12" r="4"/><circle cx="52" cy="21" r="4"/><path d="M22 47h20l4 15H18Z"/>',
  rook: '<path d="M16 14h8v9h7v-9h8v9h7v-9h6v21l-8 7v19H20V42l-8-7V14Z"/><path d="M19 35h27M20 48h24" fill="none"/>',
  bishop: '<circle cx="32" cy="10" r="4"/><path d="M32 16c-15 10-18 19-10 28h20c8-9 5-18-10-28Z"/><path d="m35 24-8 12M24 44l-4 18h24l-4-18"/>',
  knight: '<path d="m22 17 3-10 9 9c12 3 17 11 17 24v22H17l5-15 12-14-14 7-9-8 11-15Z"/><path d="m15 29 8 4M30 20l-1 8" fill="none"/><circle cx="34" cy="25" r="2.5" stroke="none" fill="currentColor"/>',
  pawn: '<circle cx="32" cy="23" r="10"/><path d="M25 33h14l-2 13 7 16H20l7-16Z"/>'
};
function pieceSvg(type, light = true) {
  return `<svg viewBox="0 0 64 76" aria-hidden="true" focusable="false" style="color:${light ? '#38574a' : '#aec2a9'}"><g fill="${light ? '#f4eccb' : '#294742'}" stroke="${light ? '#537365' : '#b9ccaf'}" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round">${pieces[type]}<path d="M17 62h30l4 7H13Z"/></g></svg>`;
}
const boardPieces = {
  e6: { type: 'king', panel: 'about', label: 'About me' },
  b5: { type: 'knight', panel: 'projects', label: 'My projects' },
  f3: { type: 'queen', panel: 'skills', label: 'My skills' },
  c2: { type: 'rook', panel: 'experience', label: 'My experience' },
  g5: { type: 'bishop', panel: 'contact', label: 'Get in touch' },
  a8: { type: 'rook', light: false }, h8: { type: 'rook', light: false },
  d8: { type: 'king', light: false }, b7: { type: 'pawn', light: false },
  f7: { type: 'pawn', light: false }, a4: { type: 'pawn', light: false },
  h2: { type: 'pawn', light: false }, d4: { type: 'pawn', light: true },
  f2: { type: 'pawn', light: true }
};
const board = document.getElementById('chessboard');
for (let rank = 8; rank >= 1; rank--) {
  for (let file = 0; file < 8; file++) {
    const position = `${String.fromCharCode(97 + file)}${rank}`;
    const square = document.createElement('div');
    square.className = `square ${(file + rank) % 2 === 0 ? 'dark' : ''}`;
    const info = boardPieces[position];
    if (info) {
      const element = document.createElement(info.panel ? 'button' : 'span');
      element.className = `piece ${info.panel ? 'interactive' : 'decorative'}`;
      element.innerHTML = pieceSvg(info.type, info.light !== false);
      if (info.panel) {
        element.type = 'button';
        element.dataset.panel = info.panel;
        element.setAttribute('aria-label', `${info.label} — ${info.type} at ${position}`);
        element.innerHTML += `<span class="piece-tooltip" aria-hidden="true">${info.label}</span>`;
      } else element.setAttribute('aria-hidden', 'true');
      square.append(element);
    }
    board.append(square);
  }
}

// 3. POND LIFE: original CSS fish and inline vector pads; no image downloads.
const life = document.getElementById('pond-life');
const koiLocations = [
  {x:13,y:36,r:28,d:26,delay:-4,color:'#e8743a'},
  {x:79,y:40,r:-38,d:30,delay:-14,color:'#d65732'},
  {x:30,y:71,r:18,d:23,delay:-8,color:'#edaf34'},
  {x:88,y:73,r:135,d:33,delay:-20,color:'#ee6d35'},
  {x:8,y:78,r:-35,d:29,delay:-13,color:'#213e3c'}
];
koiLocations.forEach(fish => {
  const element = document.createElement('div');
  element.className = 'koi-route';
  element.style.cssText = `left:${fish.x}%;top:${fish.y}%;--rotation:${fish.r}deg;--duration:${fish.d}s;--delay:${fish.delay}s;--patch:${fish.color}`;
  element.innerHTML = '<div class="koi"><div class="koi-fin"></div><div class="koi-fin right"></div><div class="koi-tail"></div><div class="koi-body"></div></div>';
  life.append(element);
});
const padLocations = [
  {x:8,y:59,s:84,r:30,d:12}, {x:23,y:85,s:100,r:-28,d:10},
  {x:75,y:73,s:110,r:12,d:14}, {x:89,y:27,s:66,r:65,d:11},
  {x:21,y:29,s:54,r:-35,d:9}, {x:65,y:88,s:68,r:100,d:13}
];
padLocations.forEach((pad, index) => {
  const element = document.createElement('div');
  element.className = `lily ${pad.s < 70 ? 'small' : ''}`;
  element.style.cssText = `left:${pad.x}%;top:${pad.y}%;--size:${pad.s}px;--rotation:${pad.r}deg;--duration:${pad.d}s;animation-delay:-${index * 1.7}s`;
  element.innerHTML = `<svg viewBox="0 0 100 100"><defs><radialGradient id="pad${index}" cx="42%" cy="35%" r="68%"><stop stop-color="#8fba53"/><stop offset=".55" stop-color="#548d43"/><stop offset="1" stop-color="#2e6d48"/></radialGradient></defs><path d="M49 48 67 6A45 45 0 1 0 89 23Z" fill="url(#pad${index})" stroke="#4a7c42" stroke-width=".7"/><g fill="none" stroke="#b0ca6999" stroke-width=".5"><path d="M49 48 14 23M49 48 4 52M49 48 23 85M49 48 54 94M49 48 87 76M49 48 93 43"/></g><path d="M49 48 43 18" stroke="#b4d37a66" fill="none"/></svg>`;
  life.append(element);
});
[{x:17,y:70},{x:83,y:59},{x:69,y:34}].forEach((flower, i) => {
  const element = document.createElement('span');
  element.className = 'water-flower';
  element.style.cssText = `left:${flower.x}%;top:${flower.y}%;animation-delay:-${i * 2}s`;
  element.textContent = '✿';
  life.append(element);
});

// 4. MOTION CONTROL: also pauses section transitions and respects reduced motion.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionPreference.matches;
try { const saved = localStorage.getItem('thinking-pond-motion'); if (!motionPreference.matches && saved !== null) paused = saved === 'paused'; } catch {}
const motionButton = document.getElementById('motion-toggle');
let waterController = null;
function updateMotion() {
  document.body.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.querySelector('.motion-label').textContent = paused ? 'Resume motion' : 'Pause motion';
  document.dispatchEvent(new CustomEvent('portfolio-motion', { detail: { paused } }));
  motionButton.querySelector('.motion-icon').textContent = paused ? '▷' : 'Ⅱ';
  waterController?.setPaused(paused);
}
motionButton.addEventListener('click', () => {
  paused = !paused;
  try { localStorage.setItem('thinking-pond-motion', paused ? 'paused' : 'running'); } catch {}
  updateMotion();
});
motionPreference.addEventListener('change', event => { paused = event.matches; updateMotion(); });
updateMotion();

// 5. WEBGL WATER: a small shader draws blue pools, caustics and pointer ripples.
// u_ripples stores x, y, creation time and strength for ten recent interactions.
const canvas = document.getElementById('water');
const pond = document.querySelector('.pond');
function createWater() {
  const gl = canvas.getContext('webgl', {alpha:false, antialias:false, powerPreference:'low-power'});
  if (!gl) throw new Error('WebGL is unavailable');
  const vertexSource = 'attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}';
  const fragmentSource = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
    #else
      precision mediump float;
    #endif
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec4 u_ripples[10];
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
    float fbm(vec2 p){float value=0.0,amp=0.5;for(int i=0;i<4;i++){value+=amp*noise(p);p=p*2.03+vec2(3.2,1.7);amp*=0.5;}return value;}
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float aspect=u_resolution.x/u_resolution.y;
      vec2 p=uv*vec2(aspect,1.0);
      float t=u_time;
      vec2 rippleOffset=vec2(0.0);
      float rippleLight=0.0;
      for(int i=0;i<10;i++){
        vec4 r=u_ripples[i];float age=t-r.z;
        if(age>=0.0&&age<3.6&&r.w>0.0){
          vec2 delta=p-r.xy*vec2(aspect,1.0);float dist=length(delta);
          float ring=sin(dist*90.0-age*12.0)*exp(-pow((dist-age*0.15)*12.0,2.0))*exp(-age*0.8)*r.w;
          rippleOffset+=normalize(delta+vec2(0.0001))*ring*0.018;
          rippleLight+=ring*0.095;
        }
      }
      p+=rippleOffset;
      vec2 drift=vec2(t*0.009,sin(t*0.09)*0.035);
      vec2 warp=vec2(fbm(p*3.0+drift),fbm(p*3.0+vec2(8.0,2.0)-drift));
      float field=fbm(p*3.5+warp*2.5+drift);
      vec3 deep=vec3(0.035,0.37,0.52);
      vec3 shallow=vec3(0.22,0.66,0.72);
      vec3 color=mix(deep,shallow,smoothstep(0.22,0.68,field));
      float sand=smoothstep(0.56,0.66,field);
      color=mix(color,vec3(0.65,0.84,0.77),sand*0.85);
      float edge=1.0-smoothstep(0.005,0.026,abs(field-0.565));
      color+=vec3(0.10,0.15,0.12)*edge;
      float caustic=pow(1.0-abs(sin((field+noise(p*8.0+drift)*0.12)*42.0+t*0.06)),20.0);
      color+=vec3(0.05,0.10,0.09)*caustic;
      color+=vec3(rippleLight*0.7,rippleLight,rippleLight);
      color+=vec3(0.0,0.025,0.045)*(1.0-uv.y);
      gl_FragColor=vec4(color,1.0);
    }`;
  function compile(type, source) {
    const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const message=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(message);}
    return shader;
  }
  const vertex=compile(gl.VERTEX_SHADER,vertexSource),fragment=compile(gl.FRAGMENT_SHADER,fragmentSource);
  const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const resolution=gl.getUniformLocation(program,'u_resolution'),time=gl.getUniformLocation(program,'u_time'),rippleUniform=gl.getUniformLocation(program,'u_ripples[0]');
  const ripples=new Float32Array(40);let nextRipple=0,clock=0,lastFrame=0,raf=0,stopped=paused,visible=true;
  function resize(){const ratio=Math.min(window.devicePixelRatio||1,1.25);canvas.width=Math.round(pond.clientWidth*ratio);canvas.height=Math.round(pond.clientHeight*ratio);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);draw();}
  function draw(){gl.uniform1f(time,clock);gl.uniform4fv(rippleUniform,ripples);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);}
  function frame(now){raf=0;if(stopped||document.hidden||!visible)return;if(!lastFrame)lastFrame=now;const delta=now-lastFrame;if(delta>=32){clock+=Math.min(delta/1000,0.08);lastFrame=now;draw();}raf=requestAnimationFrame(frame);}
  function start(){if(!raf&&!stopped&&!document.hidden&&visible){lastFrame=0;raf=requestAnimationFrame(frame);}}
  function stop(){if(raf)cancelAnimationFrame(raf);raf=0;lastFrame=0;}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop();});observer.observe(pond);
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  new ResizeObserver(resize).observe(pond);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();stop();canvas.hidden=true;document.body.dataset.water='css-fallback';});
  canvas.addEventListener('webglcontextrestored',()=>window.location.reload());
  document.body.dataset.water='webgl';resize();start();
  return {
    addRipple(x,y,strength=1){if(stopped)return;const index=nextRipple*4;ripples[index]=x;ripples[index+1]=1-y;ripples[index+2]=clock;ripples[index+3]=strength;nextRipple=(nextRipple+1)%10;},
    setPaused(value){stopped=value;if(stopped){stop();draw();}else start();}
  };
}

// 6. CANVAS FALLBACK: the preview browser may not expose a GPU. This renderer
// keeps the same composition and pointer ripples using regular 2D drawing.
function createCanvasWater() {
  const context = canvas.getContext('2d', {alpha:false});
  if (!context) throw new Error('Canvas water is unavailable');
  const texture = document.createElement('canvas');
  texture.width=360;texture.height=260;
  const textureContext=texture.getContext('2d');
  const pixels=textureContext.createImageData(texture.width,texture.height);
  function hash(x,y){let n=Math.imul(x,374761393)+Math.imul(y,668265263);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;}
  function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;const a=fx*fx*(3-2*fx),b=fy*fy*(3-2*fy);return(hash(ix,iy)*(1-a)+hash(ix+1,iy)*a)*(1-b)+(hash(ix,iy+1)*(1-a)+hash(ix+1,iy+1)*a)*b;}
  function field(x,y){let n=0,amplitude=.55;for(let i=0;i<4;i++){n+=noise(x,y)*amplitude;x=x*2.03+3.2;y=y*2.03+1.7;amplitude*=.5;}return n;}
  function smooth(a,b,value){const t=Math.max(0,Math.min(1,(value-a)/(b-a)));return t*t*(3-2*t);}
  for(let y=0;y<texture.height;y++){
    for(let x=0;x<texture.width;x++){
      const px=x/texture.width*5.5,py=y/texture.height*4.1;
      const warpX=field(px*.75,py*.75),warpY=field(px*.75+8,py*.75+2);
      const value=field(px+warpX*2.7,py+warpY*2.7);
      const depth=smooth(.24,.73,value),sand=smooth(.58,.69,value);
      const edge=1-smooth(.006,.029,Math.abs(value-.585));
      const fine=1-smooth(.001,.009,Math.abs(noise(px*3,py*3)-.5));
      const dark=[15,104,145],light=[53,161,184],shoal=[182,218,201];
      const index=(y*texture.width+x)*4;
      for(let c=0;c<3;c++){const water=dark[c]*(1-depth)+light[c]*depth;pixels.data[index+c]=Math.min(255,water*(1-sand*.83)+shoal[c]*sand*.83+edge*(c===0?9:15)+fine*3);}
      pixels.data[index+3]=255;
    }
  }
  textureContext.putImageData(pixels,0,0);
  let clock=0,stopped=paused,visible=true,raf=0,lastFrame=0;
  const ripples=[];
  function draw(){
    const width=canvas.width,height=canvas.height;
    context.drawImage(texture,0,0,width,height);
    const tile=48,extra=4;
    // Sampling a few extra pixels around each tile avoids gaps while refracting.
    for(let y=0;y<height;y+=tile){
      for(let x=0;x<width;x+=tile){
        const cx=x+tile/2,cy=y+tile/2;
        let dx=Math.sin(y/135+clock*.22)*1.1,dy=Math.cos(x/170+clock*.17)*1.1;
        for(const ripple of ripples){
          const age=clock-ripple.time;
          const rx=cx-ripple.x*width,ry=cy-ripple.y*height,distance=Math.hypot(rx,ry)+.001;
          const radius=age*Math.min(width,height)*.17;
          const wave=Math.sin((distance-radius)*.11)*Math.exp(-Math.pow((distance-radius)/47,2))*Math.exp(-age*.85)*ripple.strength*5;
          dx+=rx/distance*wave;dy+=ry/distance*wave;
        }
        const left=Math.max(0,x-extra),top=Math.max(0,y-extra),right=Math.min(width,x+tile+extra),bottom=Math.min(height,y+tile+extra);
        context.drawImage(texture,left/width*texture.width,top/height*texture.height,(right-left)/width*texture.width,(bottom-top)/height*texture.height,left+dx,top+dy,right-left,bottom-top);
      }
    }
    for(const ripple of ripples){
      const age=clock-ripple.time;
      if(age<=0||age>3.4)continue;
      const radius=age*Math.min(width,height)*.17;
      context.beginPath();context.arc(ripple.x*width,ripple.y*height,radius,0,Math.PI*2);
      context.lineWidth=1;context.strokeStyle=`rgba(223,250,235,${Math.exp(-age*1.1)*ripple.strength*.26})`;context.stroke();
    }
  }
  function resize(){const ratio=Math.min(window.devicePixelRatio||1,1);canvas.width=Math.round(pond.clientWidth*ratio);canvas.height=Math.round(pond.clientHeight*ratio);draw();}
  function frame(now){raf=0;if(stopped||document.hidden||!visible)return;if(!lastFrame)lastFrame=now;const delta=now-lastFrame;if(delta>=42){clock+=Math.min(delta/1000,.08);lastFrame=now;while(ripples.length&&clock-ripples[0].time>3.5)ripples.shift();draw();}raf=requestAnimationFrame(frame);}
  function stop(){if(raf)cancelAnimationFrame(raf);raf=0;lastFrame=0;}
  function start(){if(!raf&&!stopped&&!document.hidden&&visible){lastFrame=0;raf=requestAnimationFrame(frame);}}
  new ResizeObserver(resize).observe(pond);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop();}).observe(pond);
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  canvas.hidden=false;document.body.dataset.water='canvas2d';resize();start();
  return {addRipple(x,y,strength=1){if(!stopped){ripples.push({x,y,time:clock,strength});if(ripples.length>10)ripples.shift();}},setPaused(value){stopped=value;if(stopped)stop();else start();}};
}
try {waterController=createWater();updateMotion();}
catch(error){
  try {waterController=createCanvasWater();updateMotion();console.info('Using 2D pond water because WebGL is unavailable in this browser.');}
  catch(fallbackError){canvas.hidden=true;document.body.dataset.water='css-fallback';console.info('Using the still pond background.',fallbackError.message);}
}

// Pointer movement ripples on desktops; taps ripple on touchscreens.
let lastRipple=0;
function makeRipple(event,strong=false){
  if(paused)return;
  const rect=pond.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width,y=(event.clientY-rect.top)/rect.height;
  if(waterController&&!canvas.hidden)waterController.addRipple(x,y,strong?1.5:0.6);
  else if(strong){const ripple=document.createElement('span');ripple.className='css-ripple';ripple.style.cssText=`left:${x*100}%;top:${y*100}%`;pond.append(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});}
}
pond.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const now=performance.now();if(now-lastRipple>140){lastRipple=now;makeRipple(event);}});
pond.addEventListener('pointerdown',event=>makeRipple(event,true));
