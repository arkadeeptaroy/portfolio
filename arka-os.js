/* arka.os / repository workbench
   Minimal presentation layer. Original router, terminal, chalk and selection gate remain authoritative. */
(function(){
  "use strict";
  if(window.__ARKA_WORKBENCH__)return;
  window.__ARKA_WORKBENCH__=true;

  const $=(q,root=document)=>root.querySelector(q);
  const $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
  const escape=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const nav=$("#navigator");
  const originalNav=nav?nav.innerHTML:"";
  const project=id=>PROJECTS.find(p=>p.id===id);

  const FOCUS_ITEMS=[{"title":"Discover","short":"Problem framing","description":"Synapse/lab started with a specific learner need. Discovery, early feedback and Cognitive Load Theory shaped the problem statement and MVP direction.","projectId":"01","action":"Explore Synapse/lab"},{"title":"Define","short":"Scope & trade-offs","description":"LearnDex translates learner-profile needs into a defined experience: lesson structure, instructional sequencing and assessment. The focus is product scope before feature volume.","projectId":"02","action":"Explore LearnDex"},{"title":"Build","short":"Cross-functional delivery","description":"ContentOps Suite turns repeatable work into a delivery system: structured inputs, automation, review checkpoints and clear handoffs.","projectId":"08","action":"Explore ContentOps Suite"},{"title":"Validate","short":"Release quality","description":"AI Content Governance uses schema validation, assessment alignment and human approval as release criteria. Quality is designed into the workflow, not left to final QA.","projectId":"05","action":"Explore AI Content Governance"}];

  const routeTab=(key,label,active)=>'<button type="button" class="ide-tab'+(active===key?' active':'')+'" data-route="'+key+'" aria-current="'+(active===key?'page':'false')+'"><span class="ide-tab-type">'+(key==='projects'?'JS':key==='experience'?'MD':'MD')+'</span>'+label+'</button>';
  const tabs=active=>'<nav class="ide-tabs" aria-label="Open portfolio files">'+routeTab('home','README.md',active)+routeTab('projects','projects.js',active)+routeTab('experience','experience.md',active)+'</nav>';
  const line=(n,html,extra="")=>'<div class="ide-line '+extra+'"><span class="ide-ln" aria-hidden="true">'+String(n).padStart(2,'0')+'</span><div class="ide-line-content">'+html+'</div></div>';
  const file=(id,detail)=>{const p=project(id);if(!p)return"";return '<button type="button" data-cmd="open '+p.id+'" class="ide-reference"><span class="ide-file-id">'+p.id+'</span><span class="ide-file-content"><strong>'+escape(p.name)+'</strong><small>'+escape(detail||p.desc)+'</small></span><span aria-hidden="true" class="ide-arrow">↗</span></button>'};



  const ARKA_ASCII = NAME_ASCII;

  function home(){
    const results=[['8','documented projects','Independent + professional'],['2','founder-led experiments','Synapse/lab · LearnDex'],['7+ years','in education','Teaching, curriculum and product'],['100,000+','learners reached','Ulipsu product portfolio']];
    const records=[['01','Synapse/lab','Independent · inclusive learning and cognitive load'],['02','LearnDex','Independent · adaptive lesson planning'],['05','AI Content Governance','Professional · LLM validation and release quality'],['07','Assessment Engine','Professional · Bloom / RUAH / outcomes'],['08','ContentOps Suite','Professional · workflow automation'],['03','Catalyst Publishing','Professional · textbooks, workbooks and assessments']];
    const resultRows=results.map((d,i)=>'<div class="ark-stat"><span class="ark-stat-index">'+String(i+1).padStart(2,'0')+'</span><strong>'+escape(d[0])+'</strong><span>'+escape(d[1])+'</span><small>'+escape(d[2])+'</small></div>').join('');
    const fileRows=records.map((p,i)=>'<button type="button" class="ark-file" data-cmd="open '+p[0]+'"><span class="ark-file-num">'+String(i+1).padStart(2,'0')+'</span><span class="ark-file-path">./'+escape(p[1].toLowerCase().replace(/[^a-z0-9]+/g,'-'))+'</span><span class="ark-file-description">'+escape(p[2])+'</span><span class="ark-file-arrow" aria-hidden="true">↗</span></button>').join('');
    const flow=FOCUS_ITEMS.map((f,i)=>'<button type="button" class="ark-pipeline-node'+(i===0?' selected':'')+'" data-ark-focus="'+i+'" aria-pressed="'+(i===0?'true':'false')+'"><span>'+String(i+1).padStart(2,'0')+'</span><strong>'+escape(f.title)+'</strong><small>'+escape(f.short)+'</small></button>').join('');
    const selected=FOCUS_ITEMS[0];
    return '<div class="ark-command-center" aria-label="ARKA.OS product-management command center">'+
      '<header class="ark-menubar"><div class="ark-menubar-id"><span class="ark-mini-logo" aria-hidden="true">A</span><strong>ARKA.OS</strong><span class="ark-menu-divider">/</span><span>PORTFOLIO</span></div>'+
      '<div class="ark-menubar-right"><span class="ark-visit-label">SITE VISITS <strong id="arkVisitNumber" aria-live="polite">Loading</strong></span>'+
      '<span class="ark-menubar-sep" aria-hidden="true"></span><span class="ark-session-time" id="arkSessionTime" aria-label="Current session duration">00:00</span>'+
      '<span class="ark-menubar-sep" aria-hidden="true"></span><span class="ark-local-clock" id="osDesktopClock">--:--</span></div></header>'+
      '<div class="ark-workspace-main"><div class="ark-main-columns">'+
      '<section class="ark-terminal" aria-label="Working portfolio terminal"><div class="ark-window-chrome"><span class="ark-window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>arka@os:~/profile</span><span class="ark-window-type">TTY / 01</span></div>'+
      '<div class="ark-terminal-body"><div class="ark-boot-line"><span class="ark-ansi-green">✓</span> portfolio profile loaded &nbsp; <span class="ark-ansi-dim">/</span> 2026</div>'+
      '<div class="ark-shell-command"><span class="ark-shell-prompt">arka@os</span><span class="ark-shell-colon">:</span><span class="ark-shell-path">~</span><span class="ark-shell-dollar">$</span> neofetch</div>'+
      '<div class="ark-neofetch" role="group" aria-label="Neofetch-style professional profile">'+
      '<div class="ark-fetch-art"><pre class="ark-fetch-ascii" aria-label="Green A-shaped ASCII art for arka.os">'+escape(ARKA_ASCII)+'</pre><div class="ark-fetch-brand">arka<span>.os</span></div></div>'+
      '<div class="ark-fetch-info"><div class="ark-fetch-user">arka<span>@</span>os</div><div class="ark-fetch-dashes" aria-hidden="true"></div>'+
      '<dl class="ark-fetch-specs">'+
      '<div><dt>Owner</dt><dd>Arkadeepta Roy</dd></div>'+
      '<div><dt>OS</dt><dd>arka.os</dd></div>'+
      '<div><dt>Role</dt><dd>Product Manager</dd></div>'+
      '<div><dt>Focus</dt><dd>Discovery / roadmap / delivery</dd></div>'+
      '<div><dt>Builds</dt><dd>AI workflows / learning products / SaaS</dd></div>'+
      '<div><dt>Experience</dt><dd>7+ years in education</dd></div>'+
      '<div><dt>Portfolio</dt><dd>8 documented projects</dd></div>'+
      '<div><dt>Shell</dt><dd>Portfolio CLI</dd></div>'+
      '</dl></div></div>'+
      '<p class="ark-manifesto">I frame problems, prioritise opportunities, turn requirements into delivery plans and ship with clear quality gates. My work spans independent products, AI systems and learning platforms.</p>'+
      '<div class="ark-quick-actions"><button type="button" data-route="projects" class="ark-primary-cta">Explore my work <span aria-hidden="true">↗</span></button><button type="button" data-route="about" class="ark-quiet-cta">about.md</button><button type="button" data-route="experience" class="ark-quiet-cta">experience.md</button><button type="button" data-route="contact" class="ark-quiet-cta">contact ↗</button></div>'+
      '<form id="arkCommandForm" class="ark-inline-terminal" autocomplete="off"><label for="arkCommandInput"><span class="ark-shell-prompt">visitor@arka</span><span>:</span><span class="ark-shell-path">~</span><span class="ark-shell-dollar">$</span></label><input id="arkCommandInput" name="command" spellcheck="false" aria-label="Enter a portfolio command" placeholder="projects, experience, open 05, help" /><button type="submit" aria-label="Run command">↵</button></form>'+
      '<div class="ark-terminal-hints"><button type="button" data-ark-command="help">help</button><button type="button" data-ark-command="projects">projects</button><button type="button" data-ark-command="open 05">open 05</button><button type="button" data-ide-tool="terminal">full terminal ↗</button></div></div></section>'+
      '<section class="ark-inspector" aria-label="Product development system inspector"><div class="ark-panel-bar"><span><i class="ark-square-marker" aria-hidden="true"></i> MY PRACTICE / INTERACTIVE</span><span>01—04</span></div>'+
      '<div class="ark-inspector-body"><div class="ark-inspector-heading"><span>PRODUCT LIFECYCLE / INTERACTIVE</span><h2>From discovery to release</h2><p>Each stage links to a project and the decisions behind it.</p></div>'+
      '<div class="ark-pipeline" role="group" aria-label="Product process stages">'+flow+'</div>'+
      '<div class="ark-inspector-detail" id="arkInspectorDetail" aria-live="polite"><span class="ark-detail-label">INSPECT / 01</span><h3>'+escape(selected.title)+'</h3><p>'+escape(selected.description)+'</p><button type="button" class="ark-detail-button" data-cmd="open '+escape(selected.projectId)+'">'+escape(selected.action)+' <span aria-hidden="true">↗</span></button></div>'+
      '<div class="ark-inspector-foot"><span>SELECT A STAGE TO EXPLORE THE WORK</span></div>'+
      '<div class="ark-activity"><div class="ark-activity-head"><span>SESSION EVENTS</span><span>LOCAL ACTIVITY</span></div><ol id="arkInteractionLog" aria-label="Recent interactions" aria-live="polite"></ol></div>'+
      '</div></section>'+
      '</div><section class="ark-impact" aria-label="Reported career results"><div class="ark-section-header"><h2>EXPERIENCE / AT A GLANCE</h2><span>INDEPENDENT + PROFESSIONAL WORK</span></div><div class="ark-stats-grid">'+resultRows+'</div></section>'+
      '<section class="ark-projects" aria-label="Project files"><div class="ark-section-header"><h2>SELECTED PROJECTS</h2><button type="button" data-route="projects">Explore all projects ↗</button></div>'+
      '<div class="ark-project-head"><span>NO.</span><span>MODULE</span><span>SCOPE</span><span>OPEN</span></div><div class="ark-file-grid">'+fileRows+'</div></section>'+
      '</div><footer class="ark-command-footer"><span>ARKA.OS <span class="ark-footer-pipe">/</span> PRODUCT MANAGEMENT · AI · EDUCATION</span><span>CTRL/CMD + K : SEARCH <span class="ark-footer-pipe">/</span> ENTER COMMAND ABOVE</span></footer></div>';
  }
  function projects(filter){
    const selected=PROJECT_FILTERS.includes(filter)?filter:"all";
    const visible=orderedProjects().filter(p=>selected==="all"||p.tags.includes(selected));
    const filters=PROJECT_FILTERS.map(f=>'<button type="button" data-cmd="projects '+f+'" class="ide-filter'+(f===selected?' active':'')+'" aria-pressed="'+(f===selected?'true':'false')+'">'+(f==='all'?'All work':f==='ai'?'AI systems':f==='curriculum'?'Curriculum':'Founder work')+'</button>').join('');
    const rows=visible.map((p,i)=>'<button type="button" class="ide-project-row" data-cmd="open '+escape(p.id)+'">'+
       '<span class="ide-row-num">'+String(i+1).padStart(2,'0')+'</span>'+
       '<span class="ide-row-name">'+escape(p.name)+'</span>'+
       '<span class="ide-row-detail">'+escape(p.desc)+'</span>'+
       '<span class="ide-row-action" aria-hidden="true">↗</span></button>').join('');
    return '<section class="ide-list-view">'+tabs('projects')+
      '<header class="ide-list-header"><span class="ide-small-path">portfolio / work / projects.js</span><h1>Selected product work</h1><p>Independent builds and professional product systems across AI, assessment and learning. Select a project to see the scope and approach.</p></header>'+
      '<div class="ide-filter-row" aria-label="Filter projects">'+filters+'</div>'+
      '<div class="ide-list-head" aria-hidden="true"><span>No.</span><span>Project</span><span>What it does</span><span></span></div>'+
      '<div class="ide-project-list">'+rows+'</div>'+
      '<p class="ide-list-foot">'+visible.length+' project'+(visible.length===1?'':'s')+' shown. Details are drawn from the documented work in this portfolio.</p></section>';
  }

  function explorerEntry(key,label,type,depth=0){
    return '<button type="button" data-key="'+key+'" data-route="'+key+'" class="nav-item ide-explorer-entry ide-depth-'+depth+'"><span class="ide-entry-type">'+type+'</span><span class="ide-filename">'+label+'</span></button>';
  }
  function renderExplorer(){
    if(!nav)return;
    if(PREFS.interface==="greenboard"){
      if(nav.dataset.workbench==="true"){nav.innerHTML=originalNav;delete nav.dataset.workbench}
      applyPrefs();
      setActive(current.key);
      return;
    }
    nav.dataset.workbench="true";
    nav.innerHTML='<div class="ide-explorer-title">EXPLORER</div>'+
      '<div class="ide-explorer-project"><span class="ide-chevron" aria-hidden="true">▾</span> ARKA / PORTFOLIO</div>'+
      '<div class="ide-explorer-folder">⌄ &nbsp; profile</div>'+
      explorerEntry('home','README.md','MD',1)+
      explorerEntry('experience','experience.md','MD',1)+
      explorerEntry('about','about.md','MD',1)+
      '<div class="ide-explorer-folder">⌄ &nbsp; work</div>'+
      explorerEntry('projects','projects.js','JS',1)+
      explorerEntry('ai','ai-systems.md','MD',1)+
      explorerEntry('textbook','publishing.md','MD',1)+
      explorerEntry('featured','selected-work.md','MD',1)+
      '<div class="ide-explorer-folder">⌄ &nbsp; more</div>'+
      explorerEntry('skills','skills.md','MD',1)+
      explorerEntry('contact','contact.md','MD',1)+
      '<div class="ide-explorer-commands"><button type="button" data-ide-tool="search">⌕ &nbsp; Find a file</button><button type="button" data-ide-tool="terminal">$_ &nbsp; Open terminal</button></div>';
    setActive(current.key);
  }

  const oldHome=sections.home.render;
  sections.home.render=function(){return PREFS.interface==="greenboard"?oldHome.apply(this,arguments):home()};
  const oldProjects=sections.projects.render;
  sections.projects.render=function(filter){return PREFS.interface==="greenboard"?oldProjects.apply(this,arguments):projects(filter||"all")};

  const oldPaint=paint;
  paint=function(typed,html,key){
    const result=oldPaint.apply(this,arguments);
    if(PREFS.interface==="distro"&&key!=="home"&&key!=="projects"){
      const body=$("#pagebody");
      if(body){
        const title=$(".page-head h1",body);
        const fileName=title?title.textContent.trim():"Notes";
        const bar='<div class="ide-file-context"><button type="button" data-route="home">portfolio</button><span>/</span><button type="button" data-route="projects">work</button><span>/</span><span>'+escape(fileName)+'</span></div>';
        body.insertAdjacentHTML("afterbegin",bar);
      }
    }
    return result;
  };

  const originalSetInterface=setInterface;
  setInterface=function(){
    const result=originalSetInterface.apply(this,arguments);
    renderExplorer();
    return result;
  };

  document.addEventListener("click",function(event){
    const b=event.target.closest("[data-ide-tool]");
    if(!b)return;
    const what=b.dataset.ideTool;
    if(what==="search"&&typeof toggleActivities==="function")toggleActivities(true);
    if(what==="terminal"&&typeof toggleTerminal==="function")toggleTerminal(true);
  });


  // Public visit count, recorded once per browser tab session; not unique people.
  const VISIT_ENDPOINT='https://countapi.mileshilliard.com/api/v1/';
  const VISIT_KEY='arkadeeptaroy-portfolio-site-visits-v1';
  const VISIT_SESSION_KEY='arka_os_visit_recorded_v1';
  let remoteVisits=null,visitStatus='loading';
  function renderVisitCount(){
    const el=$('#arkVisitNumber');if(!el)return;
    if(visitStatus==='ok'&&Number.isSafeInteger(remoteVisits)){
      el.textContent=remoteVisits.toLocaleString();
      el.title='Page visits counted since launch. Not unique people.';
    }else{
      el.textContent=visitStatus==='loading'?'Loading':'Unavailable';
      el.title='The external visitor counter is unavailable.';
    }
  }
  async function syncVisits(){
    const already=(()=>{try{return sessionStorage.getItem(VISIT_SESSION_KEY)==='1'}catch(_){return false}})();
    const action=already?'get':'hit';
    try{
      const response=await fetch(VISIT_ENDPOINT+action+'/'+VISIT_KEY,{method:'GET',mode:'cors',cache:'no-store',credentials:'omit'});
      if(!response.ok)throw new Error('Counter unavailable');
      const payload=await response.json();
      const n=Number(payload&&payload.value);
      if(!Number.isSafeInteger(n)||n<0)throw new Error('Invalid count');
      remoteVisits=n;visitStatus='ok';
      if(action==='hit')try{sessionStorage.setItem(VISIT_SESSION_KEY,'1')}catch(_){}
    }catch(_){visitStatus='unavailable'}
    renderVisitCount();
  }
  const sessionStarted=Date.now();
  function updateSystemTime(){
    const clock=$('#osDesktopClock');
    if(clock)clock.textContent=new Date().toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
    const timer=$('#arkSessionTime');
    if(timer){
      const elapsed=Math.max(0,Math.floor((Date.now()-sessionStarted)/1000));
      timer.textContent=String(Math.floor(elapsed/60)).padStart(2,'0')+':'+String(elapsed%60).padStart(2,'0');
      timer.title='Current browser session duration';
    }
    renderVisitCount();
  }
  function appendActivity(label){
    const log=$('#arkInteractionLog');if(!log)return;
    const now=new Date().toLocaleTimeString(undefined,{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const entry=document.createElement('li');
    const stamp=document.createElement('time');
    stamp.textContent=now;
    const msg=document.createElement('span');
    msg.textContent=label;
    entry.append(stamp,msg);
    log.prepend(entry);
    while(log.children.length>3)log.lastElementChild.remove();
  }
  function updateInspector(index){
    const item=FOCUS_ITEMS[index],detail=$('#arkInspectorDetail');
    if(!item||!detail)return;
    appendActivity('INSPECT / '+item.title.toUpperCase());
    $$('.ark-pipeline-node').forEach((b,i)=>{
      const active=i===index;
      b.classList.toggle('selected',active);
      b.setAttribute('aria-pressed',String(active));
    });
    detail.innerHTML='<span class="ark-detail-label">INSPECT / '+String(index+1).padStart(2,'0')+'</span>'+
      '<h3>'+escape(item.title)+'</h3><p>'+escape(item.description)+'</p>'+
      '<button type="button" class="ark-detail-button" data-cmd="open '+escape(item.projectId)+'">'+escape(item.action)+' <span aria-hidden="true">↗</span></button>';
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-ark-focus]');
    if(button){updateInspector(Number(button.dataset.arkFocus));return}
    const quick=event.target.closest('[data-ark-command]');
    if(quick){appendActivity('COMMAND / '+quick.dataset.arkCommand);runCommand(quick.dataset.arkCommand);}
  });
  document.addEventListener('submit',event=>{
    if(event.target?.id!=='arkCommandForm')return;
    event.preventDefault();
    const field=$('#arkCommandInput');
    if(field&&field.value.trim()){
      const cmd=field.value.trim();
      appendActivity('COMMAND / '+cmd.slice(0,40));
      runCommand(cmd);
      field.value='';
    }
  });
  document.addEventListener('click',e=>{if(e.target.closest('[data-route],[data-cmd]'))queueMicrotask(updateSystemTime)});
  window.setInterval(updateSystemTime,1000);
  updateSystemTime();
  syncVisits();

  renderExplorer();
  navigate(current,{fromPop:true,typed:"route"});
  updateSystemTime();
  renderVisitCount();
  appendActivity('PROFILE / SESSION READY');
  document.documentElement.dataset.workbenchReady="true";
})();
