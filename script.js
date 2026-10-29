const topics = [
{code:"A01:2025",name:"Broken Access Control",short:"Users can access data or actions beyond their permission.",summary:"Access control decides what an authenticated user is allowed to do. A failure occurs when the application does not enforce those rules on every request.",example:"A student changes /profile/104 to /profile/105 and sees another student's private profile because the server checks only that the user is logged in.",prevention:["Enforce authorization on the server for every protected request.","Deny access by default and grant only required permissions.","Test access with different roles and user accounts.","Avoid trusting IDs or hidden buttons supplied by the browser."],tip:"Authentication asks “Who are you?” Authorization asks “What are you allowed to do?”"},
{code:"A02:2025",name:"Security Misconfiguration",short:"Settings, services, or permissions are unsafe or incomplete.",summary:"Applications and infrastructure can become vulnerable through default passwords, unnecessary services, verbose errors, permissive cloud storage, or missing security headers.",example:"A production server displays detailed stack traces and framework versions to every visitor, giving attackers information about its setup.",prevention:["Use secure baseline configurations and change defaults.","Disable unused features, accounts, ports, and services.","Keep development tools and debug mode out of production.","Review headers, cloud permissions, and error messages regularly."],tip:"A secure application can still be exposed by an insecure environment."},
{code:"A03:2025",name:"Software Supply Chain Failures",short:"Dependencies or build and distribution processes are compromised.",summary:"Modern applications rely on libraries, packages, build systems, and distribution services. A weakness anywhere in this chain can introduce vulnerable or malicious code.",example:"A project automatically installs an unreviewed package with a confusingly similar name to a trusted library.",prevention:["Use trusted package registries and verify package names.","Track dependencies and update them with review and testing.","Protect build credentials and release pipelines.","Generate and review a software bill of materials (SBOM) where appropriate."],tip:"Your security depends on more than the code your team writes."},
{code:"A04:2025",name:"Cryptographic Failures",short:"Sensitive data is not protected with appropriate cryptography.",summary:"This category covers failures to protect confidential data, such as storing passwords in plain text, weak cryptographic choices, or transmitting private data without proper encryption.",example:"A database stores account passwords as readable text, so a database leak exposes every password directly.",prevention:["Use established, maintained cryptographic libraries.","Hash passwords with a purpose-built password hashing algorithm and unique salts.","Use HTTPS and protect data in storage and transit.","Collect and retain only the sensitive data that is necessary."],tip:"Encoding is not encryption, and ordinary fast hashes are not suitable for password storage."},
{code:"A05:2025",name:"Injection",short:"Untrusted input is interpreted as part of a command or query.",summary:"Injection happens when an application mixes user-controlled data into a query or command without safe separation. SQL, operating-system, and other interpreters can be affected.",example:"A search form concatenates user input into a SQL query instead of using a parameterized query.",prevention:["Use parameterized queries or prepared statements.","Prefer safe APIs that separate data from commands.","Validate input for the expected type and format.","Use least-privilege database accounts and safe error handling."],tip:"Validation helps, but parameterization is the key defense for SQL injection."},
{code:"A06:2025",name:"Insecure Design",short:"The system lacks security controls at the design level.",summary:"Some weaknesses arise before code is written: missing abuse cases, unsafe business rules, or no plan for limiting risky actions. Patching code alone may not solve them.",example:"A password-reset feature lets unlimited reset attempts and has no safe recovery flow or abuse protections.",prevention:["Threat-model important features before implementation.","Define security requirements and trust boundaries.","Design rate limits, abuse prevention, and safe recovery paths.","Review architecture and test misuse cases, not only normal flows."],tip:"Secure design asks what could go wrong before the implementation exists."},
{code:"A07:2025",name:"Authentication Failures",short:"Identity checks or session handling are weak.",summary:"Authentication failures include weak login protections, insecure session handling, or poorly designed account recovery that allows someone to impersonate another user.",example:"A service allows unlimited password guesses and does not offer protections against repeated automated login attempts.",prevention:["Support multi-factor authentication where appropriate.","Use secure session cookies and rotate sessions after login.","Rate-limit login and recovery attempts.","Use secure password reset processes and avoid revealing whether an account exists."],tip:"Authentication verifies identity; protect the entire login and recovery lifecycle."},
{code:"A08:2025",name:"Software or Data Integrity Failures",short:"The application trusts updates, data, or code without verifying integrity.",summary:"This risk appears when software or important data can be changed without reliable verification. Unsafe deserialization, unsigned updates, or untrusted pipeline artifacts can be examples.",example:"An application installs update files without checking their signature or trusted origin.",prevention:["Verify signatures and integrity of software updates.","Protect source repositories and CI/CD permissions.","Avoid deserializing untrusted data with unsafe mechanisms.","Review integrity checks for critical data and build artifacts."],tip:"Knowing where data came from and whether it changed can be essential."},
{code:"A09:2025",name:"Logging & Alerting Failures",short:"Important security events are not recorded or alerts are ineffective.",summary:"Without useful logs and alerting, teams may not notice suspicious activity or may be unable to investigate incidents. Logging must also protect private information.",example:"Repeated failed administrator logins occur, but no event is recorded and no one is alerted.",prevention:["Record meaningful authentication and authorization events.","Create alerts for suspicious patterns and review them.","Protect logs against tampering and limit access.","Never log passwords, session tokens, or unnecessary sensitive data."],tip:"Logs help teams detect, investigate, and learn from security events."},
{code:"A10:2025",name:"Mishandling of Exceptional Conditions",short:"Unexpected failures produce unsafe states or expose information.",summary:"Applications must handle errors, resource exhaustion, and unusual conditions safely. Inconsistent cleanup or overly broad exception handling can cause security and reliability problems.",example:"If a payment step fails halfway through, the application leaves the order in an inconsistent state and permits an unintended second action.",prevention:["Handle errors consistently and fail safely.","Validate assumptions at system boundaries.","Use transactions and reliable cleanup for multi-step operations.","Return safe user-facing errors while recording useful internal diagnostics."],tip:"Plan for failure paths, not only the happy path."}
];

const grid = document.getElementById("topicGrid");
const detail = document.getElementById("topicDetail");
let completed = new Set(JSON.parse(localStorage.getItem("owaspTutorCompleted") || "[]"));
let activeTopic = null;

function renderTopics(filter="") {
  const filtered = topics.filter(t => `${t.code} ${t.name} ${t.short}`.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = "";
  filtered.forEach(t => {
    const button = document.createElement("button");
    button.className = "topic-card" + (activeTopic===t.code ? " active" : "");
    button.innerHTML = `<span class="code">${t.code}</span><strong>${t.name}</strong><small>${t.short}</small>${completed.has(t.code)?'<span class="done">✓ Completed</span>':""}`;
    button.addEventListener("click", () => showTopic(t.code));
    grid.appendChild(button);
  });
  if (!filtered.length) grid.innerHTML = '<p class="muted">No topics match that search. Try another word.</p>';
}
function showTopic(code) {
  const t = topics.find(x=>x.code===code); if(!t) return;
  activeTopic=code; renderTopics(document.getElementById("searchInput").value);
  detail.innerHTML = `<span class="detail-code">${t.code} · OWASP TOP 10:2025</span><h3>${t.name}</h3><p>${t.summary}</p><h4>Example scenario</h4><div class="example-box">${t.example}</div><h4>How to reduce the risk</h4><ul>${t.prevention.map(x=>`<li>${x}</li>`).join("")}</ul><h4>Remember</h4><p>${t.tip}</p><button class="btn ${completed.has(t.code)?"secondary":"primary"} mark-done" id="markDone">${completed.has(t.code)?"✓ Marked complete":"Mark topic as complete"}</button>`;
  document.getElementById("markDone").addEventListener("click",()=>{
    if(completed.has(code)) completed.delete(code); else completed.add(code);
    localStorage.setItem("owaspTutorCompleted",JSON.stringify([...completed]));
    updateStats(); showTopic(code);
  });
}
function updateStats(){
 document.getElementById("learnedCount").textContent=completed.size;
 const best=localStorage.getItem("owaspTutorBest");
 document.getElementById("bestScore").textContent=best===null?"—":`${best}%`;
}
document.getElementById("searchInput").addEventListener("input",e=>renderTopics(e.target.value));
renderTopics(); updateStats();

const knowledge = [
{q:"Which risk occurs when a user can access another user's private record by changing an identifier?",opts:["Broken Access Control","Cryptographic Failures","Logging & Alerting Failures","Software Supply Chain Failures"],a:0,why:"The server must verify that the current user is authorized to access each requested record."},
{q:"What is the recommended primary defense against SQL injection?",opts:["Hide the submit button","Use parameterized queries","Encrypt the database name","Use longer URLs"],a:1,why:"Parameterized queries keep user data separate from SQL command structure."},
{q:"Which category includes compromised dependencies or build pipelines?",opts:["Insecure Design","Authentication Failures","Software Supply Chain Failures","Mishandling of Exceptional Conditions"],a:2,why:"Supply-chain security covers dependencies, build systems, and software distribution."},
{q:"What should a secure application avoid putting in logs?",opts:["A timestamp","A security event type","A generic request ID","Passwords and session tokens"],a:3,why:"Logs should support investigation without exposing credentials or sensitive secrets."},
{q:"What does secure design encourage teams to do?",opts:["Test only after launch","Ignore unusual user behavior","Plan for threats and misuse cases early","Trust all client-side checks"],a:2,why:"Threat modeling and security requirements help address risks before implementation."}
];
let qIndex=0, score=0, answered=false;
function renderQuestion(){
 const q=knowledge[qIndex]; answered=false;
 document.getElementById("questionCounter").textContent=`QUESTION ${qIndex+1} / ${knowledge.length}`;
 document.getElementById("quizScoreLabel").textContent=`Score: ${score}`;
 document.getElementById("quizProgress").style.width=`${(qIndex/knowledge.length)*100}%`;
 document.getElementById("questionText").textContent=q.q;
 document.getElementById("quizFeedback").textContent="";
 document.getElementById("nextQuestion").disabled=true;
 document.getElementById("nextQuestion").textContent=qIndex===knowledge.length-1?"See results →":"Next question →";
 const opts=document.getElementById("answerOptions"); opts.innerHTML="";
 q.opts.forEach((opt,i)=>{
  const b=document.createElement("button"); b.className="answer-option";
  b.innerHTML=`<span class="letter">${String.fromCharCode(65+i)}</span><span>${opt}</span>`;
  b.addEventListener("click",()=>chooseAnswer(i)); opts.appendChild(b);
 });
}
function chooseAnswer(i){
 if(answered)return; answered=true; const q=knowledge[qIndex];
 const buttons=[...document.querySelectorAll(".answer-option")];
 buttons.forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add("correct");if(j===i&&i!==q.a)b.classList.add("wrong")});
 if(i===q.a)score++;
 document.getElementById("quizScoreLabel").textContent=`Score: ${score}`;
 document.getElementById("quizFeedback").textContent=(i===q.a?"Correct! ":"Not quite. ")+q.why;
 document.getElementById("nextQuestion").disabled=false;
}
document.getElementById("nextQuestion").addEventListener("click",()=>{
 if(!answered)return;
 if(qIndex<knowledge.length-1){qIndex++;renderQuestion();return;}
 const pct=Math.round(score/knowledge.length*100);
 const old=Number(localStorage.getItem("owaspTutorBest")||0);
 if(pct>old)localStorage.setItem("owaspTutorBest",String(pct));
 document.getElementById("questionCounter").textContent="QUIZ COMPLETE";
 document.getElementById("quizProgress").style.width="100%";
 document.getElementById("questionText").textContent=`You scored ${score} out of ${knowledge.length} (${pct}%).`;
 document.getElementById("answerOptions").innerHTML="";
 document.getElementById("quizFeedback").textContent=pct===100?"Excellent work! You have a strong grasp of these concepts.":"Review the topic cards and try again to strengthen your understanding.";
 document.getElementById("nextQuestion").disabled=true;
 document.getElementById("nextQuestion").textContent="Completed";
 updateStats();
});
document.getElementById("restartQuiz").addEventListener("click",()=>{qIndex=0;score=0;renderQuestion()});
renderQuestion();

const chatMessages=document.getElementById("chatMessages");
function addMessage(text,who){
 const row=document.createElement("div");row.className=`message ${who}`;
 const avatar=document.createElement("div");avatar.className="message-avatar";avatar.textContent=who==="bot"?"✦":"You";
 const bubble=document.createElement("div");bubble.className="bubble";bubble.textContent=text;
 if(who==="bot")row.appendChild(avatar);row.appendChild(bubble);chatMessages.appendChild(row);chatMessages.scrollTop=chatMessages.scrollHeight;
}
function tutorReply(input){
 const s=input.toLowerCase();
 if(/hello|hi\b|hey/.test(s))return "Hello! Choose a topic card or ask me about one of the OWASP Top 10:2025 risks.";
 if(/study tip|remember|memorize|revision/.test(s))return "Study tip: for each risk, remember three things—what goes wrong, a realistic example, and the main prevention. Then explain it in your own words.";
 if(/quiz|test me|practice/.test(s))return "Try the Knowledge Check section below. It has five questions with explanations, and your best score is saved in this browser.";
 const t=topics.find(x=>s.includes(x.name.toLowerCase())||s.includes(x.code.toLowerCase())||
  (s.includes("access control")&&x.code==="A01:2025")||
  (s.includes("misconfiguration")&&x.code==="A02:2025")||
  ((s.includes("supply chain")||s.includes("dependency"))&&x.code==="A03:2025")||
  ((s.includes("cryptography")||s.includes("encryption")||s.includes("password hash"))&&x.code==="A04:2025")||
  (s.includes("injection")&&x.code==="A05:2025")||
  (s.includes("insecure design")&&x.code==="A06:2025")||
  ((s.includes("login")||s.includes("authentication"))&&x.code==="A07:2025")||
  ((s.includes("integrity")||s.includes("signature"))&&x.code==="A08:2025")||
  ((s.includes("logging")||s.includes("alert"))&&x.code==="A09:2025")||
  ((s.includes("exception")||s.includes("error handling"))&&x.code==="A10:2025"));
 if(t)return `${t.code} — ${t.name}\n\nIn simple terms: ${t.summary}\n\nExample: ${t.example}\n\nHow to reduce the risk: ${t.prevention.slice(0,3).join(" ")}`;
 if(s.includes("prevent")||s.includes("defend")||s.includes("secure"))return "A useful starting point is to enforce authorization on the server, separate untrusted data from commands, keep dependencies updated, use established cryptography, and log important security events without recording secrets. Which OWASP category do you want to explore?";
 return "I can answer questions using the project's built-in OWASP Top 10:2025 notes. Try asking about broken access control, misconfiguration, supply-chain failures, cryptographic failures, injection, insecure design, authentication, integrity, logging and alerting, or exceptional conditions.";
}
function sendChat(value){
 const clean=value.trim();if(!clean)return;
 addMessage(clean,"user");document.getElementById("chatInput").value="";
 setTimeout(()=>addMessage(tutorReply(clean),"bot"),120);
}
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();sendChat(document.getElementById("chatInput").value)});
document.querySelectorAll(".suggestion").forEach(b=>b.addEventListener("click",()=>sendChat(b.textContent)));
document.getElementById("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("owaspTutorTheme",document.body.classList.contains("light")?"light":"dark")});
if(localStorage.getItem("owaspTutorTheme")==="light")document.body.classList.add("light");
