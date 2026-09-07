export const sandboxHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="theme-color" content="#08090d" />
<title>My REST API — Sandbox</title>
<style>
:root{color-scheme:dark;--bg:#08090d;--panel:rgba(18,20,28,.76);--panel2:rgba(25,28,38,.9);--line:rgba(255,255,255,.09);--text:#f5f7fb;--muted:#9ca4b4;--accent:#8b7cff;--accent2:#52d6ff;--good:#58d68d;--bad:#ff6b7a;--shadow:0 20px 70px rgba(0,0,0,.4)}*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:radial-gradient(circle at 15% 0%,rgba(139,124,255,.18),transparent 30%),radial-gradient(circle at 90% 20%,rgba(82,214,255,.12),transparent 28%),var(--bg);color:var(--text);min-height:100vh}button,input,select{font:inherit}button{cursor:pointer}.shell{max-width:1450px;margin:auto;padding:22px;display:grid;grid-template-columns:280px minmax(0,1fr);gap:18px;min-height:100vh}.sidebar,.topbar,.composer,.empty,.message{border:1px solid var(--line);background:var(--panel);backdrop-filter:blur(18px);box-shadow:var(--shadow)}.sidebar{border-radius:24px;padding:18px;position:sticky;top:22px;height:calc(100vh - 44px);display:flex;flex-direction:column}.brand{display:flex;align-items:center;gap:12px;padding:6px 4px 20px}.logo{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:grid;place-items:center;font-weight:900;color:#08090d}.brand b{font-size:16px}.brand span{display:block;color:var(--muted);font-size:12px;margin-top:2px}.search{width:100%;border:1px solid var(--line);background:rgba(255,255,255,.04);border-radius:12px;color:var(--text);padding:11px 12px;outline:none}.search:focus{border-color:rgba(139,124,255,.65)}.section-title{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin:20px 4px 9px}.categories{display:flex;flex-direction:column;gap:5px;overflow:auto}.cat{border:0;background:transparent;color:var(--muted);text-align:left;padding:9px 10px;border-radius:10px}.cat:hover,.cat.active{background:rgba(255,255,255,.06);color:var(--text)}.count{float:right;font-size:11px;opacity:.6}.sidebar-foot{margin-top:auto;border-top:1px solid var(--line);padding-top:14px;color:var(--muted);font-size:12px;line-height:1.5}.main{min-width:0;display:flex;flex-direction:column;gap:14px}.topbar{border-radius:20px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;gap:12px}.title h1{font-size:18px;margin:0}.title p{margin:4px 0 0;color:var(--muted);font-size:12px}.status{display:flex;align-items:center;gap:7px;color:var(--muted);font-size:12px}.dot{width:8px;height:8px;border-radius:50%;background:var(--good);box-shadow:0 0 15px var(--good)}.messages{flex:1;min-height:55vh;display:flex;flex-direction:column;gap:12px;padding:6px 4px 0}.welcome{padding:42px 20px;text-align:center}.welcome h2{font-size:34px;letter-spacing:-.04em;margin:8px 0}.welcome p{color:var(--muted);max-width:620px;margin:0 auto 24px;line-height:1.6}.quick{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.quick button,.run{border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--text);border-radius:999px;padding:9px 13px}.quick button:hover,.run:hover{border-color:rgba(139,124,255,.55);background:rgba(139,124,255,.1)}.message{max-width:900px;border-radius:18px;padding:14px 16px;animation:rise .25s ease}.message.user{align-self:flex-end;background:linear-gradient(135deg,rgba(139,124,255,.22),rgba(82,214,255,.08));border-color:rgba(139,124,255,.25)}.message.bot{align-self:flex-start}.meta{display:flex;justify-content:space-between;gap:15px;font-size:11px;color:var(--muted);margin-bottom:7px}.bubble{line-height:1.65;white-space:pre-wrap;word-break:break-word}.bubble strong{color:var(--text)}.card{margin-top:10px;padding:13px;border-radius:14px;background:rgba(0,0,0,.18);border:1px solid var(--line)}.card img{max-width:100%;border-radius:12px;display:block}.kv{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px}.kv div{padding:10px;border-radius:10px;background:rgba(255,255,255,.035)}.kv small{display:block;color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.08em}.kv b{display:block;margin-top:4px}.composer{border-radius:22px;padding:10px;display:flex;gap:9px;align-items:flex-end}.composer select,.composer input{border:0;outline:0;background:transparent;color:var(--text)}.composer select{max-width:170px;padding:10px}.composer input{flex:1;padding:11px;min-width:100px}.composer .send{width:44px;height:44px;border:0;border-radius:14px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#08090d;font-weight:900}.hint{text-align:center;color:var(--muted);font-size:10px}.loading{display:inline-flex;gap:4px}.loading i{width:5px;height:5px;border-radius:50%;background:var(--muted);animation:b 1s infinite}.loading i:nth-child(2){animation-delay:.15s}.loading i:nth-child(3){animation-delay:.3s}@keyframes b{50%{opacity:.2;transform:translateY(-3px)}}@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media(max-width:850px){.shell{grid-template-columns:1fr;padding:10px}.sidebar{position:relative;top:auto;height:auto;border-radius:18px}.categories{flex-direction:row;overflow:auto}.cat{white-space:nowrap}.sidebar-foot{display:none}.welcome h2{font-size:27px}.topbar{border-radius:16px}.composer{position:sticky;bottom:8px}.composer select{max-width:125px}}
</style>
</head>
<body>
<div class="shell">
<aside class="sidebar">
  <div class="brand"><div class="logo">API</div><div><b>My REST API</b><span>Interactive Sandbox</span></div></div>
  <input id="search" class="search" placeholder="Search APIs…" autocomplete="off" />
  <div class="section-title">Categories</div>
  <div id="categories" class="categories"></div>
  <div class="sidebar-foot">Try an endpoint like a chatbot. Results are formatted into readable bubbles instead of raw JSON.</div>
</aside>
<main class="main">
  <header class="topbar"><div class="title"><h1>API Playground</h1><p id="subtitle">Explore connected public providers through one interface.</p></div><div class="status"><span class="dot"></span><span id="statusText">Ready</span></div></header>
  <section id="messages" class="messages">
    <div id="welcome" class="welcome"><div class="logo" style="margin:auto">✦</div><h2>What do you want to test?</h2><p>Pick an API, enter a prompt, and the sandbox will call your REST endpoint and turn the response into a friendly chat-style result.</p><div class="quick"><button data-action="weather">Weather in Kediri</button><button data-action="pokemon">Pokemon Pikachu</button><button data-action="dog">Random dog</button><button data-action="quote">Random quote</button><button data-action="country">Indonesia info</button></div></div>
  </section>
  <form id="composer" class="composer"><select id="endpoint"></select><input id="input" placeholder="Parameter / query…" autocomplete="off" /><button class="send" title="Run API">➤</button></form>
  <div class="hint">Responses are proxied through this API • No raw JSON required</div>
</main>
</div>
<script>
const root=location.origin;let catalog=[];let active='all';
const $=id=>document.getElementById(id);
const endpoint=$('endpoint'), input=$('input'), messages=$('messages'), status=$('statusText');
const routes=[
{id:'weather',cat:'weather',label:'Weather',hint:'lat,lon e.g. -7.8166,112.0116',url:v=>'/api/v1/weather?lat='+encodeURIComponent((v||'-7.8166,112.0116').split(',')[0])+'&lon='+encodeURIComponent((v||'-7.8166,112.0116').split(',')[1]||'112.0116')},
{id:'country',cat:'geo',label:'Country info',hint:'ISO code e.g. ID',url:v=>'/api/v1/free/country/'+encodeURIComponent(v||'ID')},
{id:'pokemon',cat:'games',label:'Pokemon',hint:'name e.g. pikachu',url:v=>'/api/v1/free/pokemon/'+encodeURIComponent(v||'pikachu')},
{id:'dog',cat:'animals',label:'Random dog',hint:'no parameter',url:()=>'/api/v1/free/dog/random'},
{id:'cat',cat:'animals',label:'Cat fact',hint:'no parameter',url:()=>'/api/v1/free/cat/fact'},
{id:'meal',cat:'food',label:'Random meal',hint:'no parameter',url:()=>'/api/v1/free/meal/random'},
{id:'book',cat:'books',label:'Book search',hint:'query e.g. javascript',url:v=>'/api/v1/free/book/search?q='+encodeURIComponent(v||'javascript')},
{id:'fx',cat:'finance',label:'Currency FX',hint:'USD,IDR',url:v=>{let p=(v||'USD,IDR').split(',');return '/api/v1/free/fx?from='+encodeURIComponent(p[0]||'USD')+'&to='+encodeURIComponent(p[1]||'IDR')}},
{id:'words',cat:'words',label:'Related words',hint:'word e.g. developer',url:v=>'/api/v1/free/words?q='+encodeURIComponent(v||'developer')},
{id:'ip',cat:'network',label:'Public IP',hint:'no parameter',url:()=>'/api/v1/free/ip'},
{id:'universities',cat:'education',label:'Universities',hint:'country e.g. Indonesia',url:v=>'/api/v1/free/universities?country='+encodeURIComponent(v||'Indonesia')},
{id:'trivia',cat:'games',label:'Trivia',hint:'amount 1-50',url:v=>'/api/v1/free/trivia?amount='+encodeURIComponent(v||'5')},
{id:'posts',cat:'testing',label:'Demo posts',hint:'no parameter',url:()=>'/api/v1/free/testing/posts'},
{id:'products',cat:'testing',label:'Demo products',hint:'no parameter',url:()=>'/api/v1/free/testing/products'},
{id:'random-user',cat:'people',label:'Random user',hint:'no parameter',url:()=>'/api/v1/free/random-user'},
{id:'anime',cat:'anime',label:'Anime search',hint:'query e.g. naruto',url:v=>'/api/v1/free/anime/search?q='+encodeURIComponent(v||'naruto')},
{id:'holidays',cat:'calendar',label:'Public holidays',hint:'ID,2026',url:v=>{let p=(v||'ID,2026').split(',');return '/api/v1/free/holidays/'+encodeURIComponent(p[0]||'ID')+'/'+encodeURIComponent(p[1]||'2026')}},
{id:'sun',cat:'astronomy',label:'Sunrise / sunset',hint:'lat,lon',url:v=>{let p=(v||'-7.8166,112.0116').split(',');return '/api/v1/free/sun?lat='+encodeURIComponent(p[0])+'&lon='+encodeURIComponent(p[1])}},
{id:'wiki',cat:'knowledge',label:'Wikipedia search',hint:'query e.g. Indonesia',url:v=>'/api/v1/free/wiki/search?q='+encodeURIComponent(v||'Indonesia')},
{id:'github',cat:'developer',label:'GitHub repo',hint:'owner,repo',url:v=>{let p=(v||'Magnw27,my-rest-api').split(',');return '/api/v1/free/github/repo/'+encodeURIComponent(p[0])+'/'+encodeURIComponent(p[1])}},
{id:'quote',cat:'content',label:'Random quote',hint:'no parameter',url:()=>'/api/v1/free/quote'}];
function setStatus(t,bad=false){status.textContent=t;document.querySelector('.dot').style.background=bad?'var(--bad)':'var(--good)'}
function renderRoutes(filter=''){endpoint.innerHTML=routes.filter(r=>(active==='all'||r.cat===active)&&r.label.toLowerCase().includes(filter.toLowerCase())).map(r=>'<option value="'+r.id+'">'+r.label+'</option>').join('');updateHint()}
function updateHint(){let r=routes.find(x=>x.id===endpoint.value);input.placeholder=r?.hint||'Parameter / query…'}
function add(role,title,text,html=''){let el=document.createElement('div');el.className='message '+role;el.innerHTML='<div class="meta"><span>'+esc(title)+'</span><span>'+new Date().toLocaleTimeString()+'</span></div><div class="bubble">'+(html||esc(text))+'</div>';messages.appendChild(el);el.scrollIntoView({behavior:'smooth',block:'end'})}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function pretty(data,provider){if(data&&data.success!==undefined&&data.data!==undefined)data=data.data;
 if(provider==='dog-ceo'&&data?.message)return '<div class="card"><img src="'+esc(data.message)+'" alt="Random dog"></div>';
 if(data?.message&&provider==='cat-fact')return '<div class="card">'+esc(data.message)+'</div>';
 if(data?.contents?.quotes?.[0])return '<div class="card"><b>“'+esc(data.contents.quotes[0].quote||data.contents.quotes[0].text)+'</b><br><span style="color:var(--muted)">— '+esc(data.contents.quotes[0].author||'Unknown')+'</span></div>';
 if(data?.results?.[0]?.name?.common)return '<div class="card"><h3>'+esc(data.results[0].name.common)+'</h3><div class="kv"><div><small>Capital</small><b>'+esc(data.results[0].capital?.[0]||'—')+'</b></div><div><small>Region</small><b>'+esc(data.results[0].region||'—')+'</b></div><div><small>Population</small><b>'+Number(data.results[0].population||0).toLocaleString()+'</b></div></div></div>';
 if(data?.name&&data?.sprites?.front_default)return '<div class="card"><h3>'+esc(data.name)+'</h3><img src="'+esc(data.sprites.front_default)+'" alt="'+esc(data.name)+'" style="width:140px;margin:auto"></div>';
 if(data?.ip)return '<div class="card"><b>Public IP</b><div style="font-size:24px;margin-top:5px">'+esc(data.ip)+'</div></div>';
 if(data?.fact)return '<div class="card">'+esc(data.fact)+'</div>';
 if(Array.isArray(data))return '<div class="card">'+data.slice(0,10).map((x,i)=>'<div style="padding:8px 0;border-bottom:1px solid var(--line)"><b>'+((x.name?.common||x.name||x.title||x.login?.username||'Result '+(i+1)))+'</b>'+(x.url?'<br><span style="color:var(--muted)">'+esc(x.url)+'</span>':'')+'</div>').join('')+'</div>';
 if(data?.data&&Array.isArray(data.data))return pretty(data.data,provider);
 let entries=Object.entries(data||{}).filter(([k])=>k!=='success'); if(entries.length&&entries.length<=12)return '<div class="card kv">'+entries.map(([k,v])=>'<div><small>'+esc(k)+'</small><b>'+esc(typeof v==='object'?JSON.stringify(v):v)+'</b></div>').join('')+'</div>';
 return '<div class="card">'+esc(JSON.stringify(data,null,2))+'</div>'}
async function run(id,val,showUser=true){let r=routes.find(x=>x.id===id)||routes[0];let url=r.url(val);if(showUser)add('user',r.label,val||'Run endpoint');setStatus('Calling '+r.label+'…');let loading=document.createElement('div');loading.className='message bot';loading.innerHTML='<div class="meta"><span>My REST API</span><span>working</span></div><div class="bubble loading"><i></i><i></i><i></i></div>';messages.appendChild(loading);try{let t=performance.now(),res=await fetch(root+url),data=await res.json(),ms=Math.round(performance.now()-t);loading.remove();if(!res.ok)throw new Error(data?.error?.message||'Request failed ('+res.status+')');add('bot','My REST API • '+ms+'ms','',pretty(data,r.id==='quote'?'quotable':r.id==='dog'?'dog-ceo':r.id==='cat'?'cat-fact':r.id));setStatus('Ready • '+res.status)}catch(e){loading.remove();add('bot','Request error',String(e.message||e));setStatus('Error',true)}}
$('composer').addEventListener('submit',e=>{e.preventDefault();run(endpoint.value,input.value.trim())});endpoint.addEventListener('change',updateHint);$('search').addEventListener('input',e=>renderRoutes(e.target.value));
$('quick')?.remove();document.querySelectorAll('.quick button').forEach(b=>b.addEventListener('click',()=>{let a=b.dataset.action;let vals={weather:'-7.8166,112.0116',pokemon:'pikachu',dog:'',quote:'',country:'ID'};endpoint.value=a;input.value=vals[a]||'';run(a,vals[a]||'')}));
function cats(){let cs=['all',...new Set(routes.map(r=>r.cat))];$('categories').innerHTML=cs.map(c=>'<button class="cat '+(c===active?'active':'')+'" data-cat="'+c+'">'+c.replace(/-/g,' ')+' <span class="count">'+(c==='all'?routes.length:routes.filter(r=>r.cat===c).length)+'</span></button>').join('');document.querySelectorAll('.cat').forEach(x=>x.onclick=()=>{active=x.dataset.cat;document.querySelectorAll('.cat').forEach(y=>y.classList.toggle('active',y===x));renderRoutes($('search').value)})}
cats();renderRoutes();
fetch(root+'/api/v1/free/catalog').then(r=>r.json()).then(x=>{catalog=x.data||x; $('subtitle').textContent=(catalog.length||routes.length)+' connected public API providers • interactive sandbox'}).catch(()=>{});
</script>
</body></html>`;
