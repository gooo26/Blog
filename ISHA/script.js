const $=s=>document.querySelector(s);
/* Features */
const F=[["🧠","Local AI brain","ISHA runs a GGUF model through llama.cpp right on your PC, with no cloud AI and no model server. It picks a 3B, 7B or 14B model to match your RAM.",1],
["🎙️","Hindi, Hinglish and English voice","Speak to ISHA with your microphone. It answers in a natural neural voice and falls back to an offline voice when the internet is down."],
["✋","Hand gesture control","Point with your index finger to move the cursor, pinch to click, use two fingers to scroll. A smoothing filter keeps it steady."],
["🖥️","Full PC control","Open any app or settings page, switch or close windows, change volume and brightness, lock the screen, take screenshots."],
["📊","Live system monitor","Ask for CPU, RAM, GPU, battery, storage, Wi-Fi and network status at any time."],
["📁","Smart file manager","Search, read, write, move and delete files inside your own folders, with the Recycle Bin as a safety net."],
["💾","Long-term memory","ISHA remembers what you tell it and recalls it later using a vector memory (ChromaDB or FAISS)."],
["👨‍💻","Autonomous coder","Describe a task and ISHA writes the code, runs Python, JavaScript or shell scripts, reads errors and fixes them, up to five tries."]];
$('#feat').innerHTML=F.map(f=>`<div class="card${f[3]?' wide':''}"><span class="ic">${f[0]}</span><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join('');

/* Safety demo */
const D=[["Set volume to 40%","safe","Volume is now 40%.",""],
["Delete my old screenshots","confirm","Move 12 screenshots to the Recycle Bin?","Done. 12 files are in the Recycle Bin and can be restored."],
["Run backup.py","critical","This runs code on your PC. Allow ISHA to run backup.py?","backup.py finished with no errors."],
["Shut down the PC","critical","This affects your whole system. Shut down now?","Shutting down in 10 seconds."]];
const C={safe:["Safe","var(--ice)"],confirm:["Confirm","var(--gold)"],critical:["Critical","var(--red)"]};
$('#chips').innerHTML=D.map((d,i)=>`<button class="chip" data-i="${i}" aria-pressed="false">${d[0]}</button>`).join('');
$('#chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;
 document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed',c===b));
 const d=D[b.dataset.i],[t,c]=C[d[1]],o=$('#out');
 o.innerHTML=`<div class="u">You: ${d[0]}</div><span class="badge" style="--c:${c}">${t}</span><div id="r">${d[1]==='safe'?'<b>Done instantly.</b> '+d[2]:'<b>ISHA asks:</b> '+d[2]}</div>`+(d[1]==='safe'?'':`<div class="ask"><button class="ok">Allow</button><button class="no">Deny</button></div>`);
 const a=o.querySelector('.ask');if(a)a.onclick=ev=>{const k=ev.target.className;if(!k)return;$('#r').innerHTML=k==='ok'?'<b>Approved.</b> '+d[3]:'<b>Cancelled.</b> Nothing was changed.';a.remove()}};

/* Team */
const av=h=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h} 65% 32%)'/><stop offset='1' stop-color='#0b1226'/></linearGradient></defs><rect width='100' height='100' fill='url(#g)'/><circle cx='50' cy='38' r='17' fill='hsl(${h} 55% 78%)'/><path d='M16 100c2-26 18-38 34-38s32 12 34 38z' fill='hsl(${h} 55% 78%)'/></svg>`);
/* Put a real photo link or image data in "photo" to replace the silhouette */
const T=[["Amit Vishwakarma","Developer","Started ISHA in 2021 and writes its core: the local AI brain, PC tools and desktop interface.","",200],
["Teli Mohit","Program Testing","Tests every command and gesture on real machines and catches bugs before users do.","",45],
["Parth","Document and Agreement","Keeps project documents, licences and agreements clear and in writing.","",215],
["Bhumika Kashyap","Thinking and Suggestions","Turns ideas into plans and suggests features that make ISHA more useful.","",330],
["Jayswal Priya","Voice Provider","Gives ISHA its voice, working on speech quality and natural Hindi and English phrasing.","",170],
["S.M. Patel","Guide","Mentors the team and guides the project's direction, priorities and quality.","",30]];
$('#team-grid').innerHTML=T.map(t=>`<article class="m"><img alt="${t[0]}" src="${t[3]||av(t[4])}" onerror="this.onerror=null;this.src=av(${t[4]})"><h3>${t[0]}</h3><em>${t[1]}</em><p>${t[2]}</p></article>`).join('');
document.querySelectorAll('.m').forEach(c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateX(${-y*12}deg) rotateY(${x*14}deg)`};c.onpointerleave=()=>c.style.transform=''});

/* Hero 3D tilt */
const S=$('#scene');addEventListener('pointermove',e=>{S.style.setProperty('--ry',((e.clientX/innerWidth-.5)*30)+'deg');S.style.setProperty('--rx',(-(e.clientY/innerHeight-.5)*30)+'deg')});

/* Particles */
const cv=$('#bg'),cx=cv.getContext('2d'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;let W,H,P=[],m={x:-999,y:-999};
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(90,W/16|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
addEventListener('resize',rs);addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY});rs();
function fr(){cx.clearRect(0,0,W,H);
 for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<120&&d>0){p.x+=dx/d*1.6;p.y+=dy/d*1.6}cx.fillStyle='rgba(111,227,255,.85)';cx.fillRect(p.x,p.y,2,2)}
 for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<110){cx.strokeStyle=`rgba(232,198,106,${.24*(1-d/110)})`;cx.beginPath();cx.moveTo(P[i].x,P[i].y);cx.lineTo(P[j].x,P[j].y);cx.stroke()}}
 if(!rm)requestAnimationFrame(fr)}
fr();
/* Extras */
const FL=[["You speak or type","Use the microphone or the chat box."],["ISHA remembers","Related facts from long-term memory are added to your request."],["The AI decides","The local model picks the right tool and asks if a detail is missing."],["Safety check","Safe actions run. Everything else waits for your approval."],["It acts","The tool runs in the background, so the window never freezes."],["It replies","The answer streams sentence by sentence and is spoken aloud."]];
$('#flow').innerHTML=FL.map((f,i)=>`<div class="st"><i>${i+1}</i><h3>${f[0]}</h3><p>${f[1]}</p></div>`).join('');
$('#stack').innerHTML=['Python','PyQt5','llama.cpp','ChromaDB','FAISS','MediaPipe','OpenCV','edge-tts','SpeechRecognition','psutil','PyAutoGUI','pycaw'].map(x=>`<span>${x}</span>`).join('');
$('#gest').innerHTML=[["Point with your index finger","Moves the cursor"],["Pinch thumb and index finger","Left click"],["Pinch thumb and middle finger","Right click"],["Raise two fingers","Scrolls the page"],["Lower your hand or open your palm","Cursor stops"]].map(g=>`<div><b>${g[0]}</b><span>${g[1]}</span></div>`).join('');
const PH=["Hey ISHA, volume 40 kar do","Battery kitni bachi hai?","Desktop par hello.py banao aur chalao","YouTube par koi gaana chalao","Meri screenshot le lo"];let pi=0,ci=0,dl=false;const ty=$('#ty');
function tp(){const t=PH[pi];ci+=dl?-1:1;ty.textContent=t.slice(0,ci);let w=dl?26:62;if(!dl&&ci===t.length){dl=true;w=1700}else if(dl&&ci===0){dl=false;pi=(pi+1)%PH.length;w=400}setTimeout(tp,w)}
rm?ty.textContent=PH[0]:tp();
const gl=$('#glow');addEventListener('pointermove',e=>{gl.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;const c=e.target.closest&&e.target.closest('.card,.tier,.st');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
addEventListener('scroll',()=>{$('#pr').style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'});
