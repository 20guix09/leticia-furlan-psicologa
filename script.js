'use strict';
const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const isOpen=menuButton.getAttribute('aria-expanded')==='true';menu.classList.toggle('open',!isOpen);menuButton.setAttribute('aria-expanded',String(!isOpen));menuButton.setAttribute('aria-label',isOpen?'Abrir menu':'Fechar menu');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();hideBear();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window && !motionQuery.matches){document.body.classList.add('js-reveal');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:0.08});document.querySelectorAll('.reveal').forEach(node=>observer.observe(node));}
const phone=document.getElementById('telefone');
const email=document.getElementById('email');
const form=document.getElementById('contact-form');
const nameField=document.getElementById('nome');
const phoneError=document.getElementById('phone-error');
const emailError=document.getElementById('email-error');
const trigger=document.getElementById('interest-trigger');
const interest=document.getElementById('interesse');
const optionsList=document.getElementById('interest-options');
const options=Array.from(optionsList.querySelectorAll('[role=option]'));
const interestError=document.getElementById('interest-error');
const status=document.getElementById('form-status');
const submitButton=form.querySelector('[type=submit]');
const submitLabel=document.getElementById('submit-label');
let activeOption=0;
let submitting=false;
function maskPhone(value){const n=value.replace(/\D/g,'').slice(0,11);if(n.length===0)return '';if(n.length<=2)return '('+n;if(n.length<=6)return '('+n.slice(0,2)+') '+n.slice(2);const cut=n.length===11?7:6;return '('+n.slice(0,2)+') '+n.slice(2,cut)+'-'+n.slice(cut);}
function isValidPhone(value){const n=value.replace(/\D/g,'');const ddds=['11','12','13','14','15','16','17','18','19','21','22','24','27','28','31','32','33','34','35','37','38','41','42','43','44','45','46','47','48','49','51','53','54','55','61','62','63','64','65','66','67','68','69','71','73','74','75','77','79','81','82','83','84','85','86','87','88','89','91','92','93','94','95','96','97','98','99'];return ddds.includes(n.slice(0,2))&&((n.length===11&&n[2]==='9')||(n.length===10&&/[2-5]/.test(n[2])))&&!/^(\d)\1+$/.test(n.slice(2));}
function isValidEmail(value){if(value.length>254)return false;const at=value.lastIndexOf('@');if(at<1||at>64)return false;const local=value.slice(0,at),domain=value.slice(at+1);return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)&&!local.startsWith('.')&&!local.endsWith('.')&&!local.includes('..')&&domain.length<=253&&domain.split('.').length>=2&&domain.split('.').every(s=>s.length>=1&&s.length<=63&&/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(s))&&/^[A-Za-z]{2,63}$/.test(domain.split('.').at(-1));}
function fieldValidity(field,error,message){field.setCustomValidity(message);field.setAttribute('aria-invalid',String(Boolean(message)));error.textContent=message;return !message;}
function validatePhone(){return fieldValidity(phone,phoneError,isValidPhone(phone.value)?'':'Informe um WhatsApp com DDD válido e número completo.');}
function validateEmail(){email.value=email.value.trim();return fieldValidity(email,emailError,isValidEmail(email.value)?'':'Informe um e-mail válido, como voce@exemplo.com.');}
phone.addEventListener('input',()=>{const old=phone.value;const cursor=phone.selectionStart;const wasEnd=cursor===old.length;phone.value=maskPhone(old);if(!wasEnd&&cursor!==null){const digitsBefore=old.slice(0,cursor).replace(/\D/g,'').length;let count=0,pos=0;while(pos<phone.value.length&&count<digitsBefore){if(/\d/.test(phone.value[pos]))count++;pos++;}phone.setSelectionRange(pos,pos);}fieldValidity(phone,phoneError,'');});
phone.addEventListener('blur',()=>{if(phone.value)validatePhone();});
email.addEventListener('input',()=>fieldValidity(email,emailError,''));
email.addEventListener('blur',()=>{if(email.value)validateEmail();});
nameField.addEventListener('input',()=>nameField.setCustomValidity(''));
function setActiveOption(index){activeOption=(index+options.length)%options.length;options.forEach((option,i)=>option.classList.toggle('is-active',i===activeOption));trigger.setAttribute('aria-activedescendant',options[activeOption].id);options[activeOption].scrollIntoView({block:'nearest'});}
function closeOptions(){optionsList.hidden=true;trigger.setAttribute('aria-expanded','false');trigger.removeAttribute('aria-activedescendant');}
function openOptions(){optionsList.hidden=false;trigger.setAttribute('aria-expanded','true');const chosen=options.findIndex(option=>option.dataset.value===interest.value);setActiveOption(chosen<0?0:chosen);}
function chooseOption(index){interest.value=options[index].dataset.value;document.getElementById('interest-value').textContent=interest.value;options.forEach((option,i)=>option.setAttribute('aria-selected',String(i===index)));trigger.setAttribute('aria-invalid','false');interestError.textContent='';closeOptions();trigger.focus({preventScroll:true});}
trigger.addEventListener('click',()=>optionsList.hidden?openOptions():closeOptions());
options.forEach((option,index)=>option.addEventListener('click',()=>chooseOption(index)));
trigger.addEventListener('keydown',event=>{const open=!optionsList.hidden;if(['ArrowDown','ArrowUp','Home','End','Enter',' '].includes(event.key)){event.preventDefault();if(!open){openOptions();if(event.key==='End')setActiveOption(options.length-1);return;}if(event.key==='ArrowDown')setActiveOption(activeOption+1);else if(event.key==='ArrowUp')setActiveOption(activeOption-1);else if(event.key==='Home')setActiveOption(0);else if(event.key==='End')setActiveOption(options.length-1);else chooseOption(activeOption);}else if(event.key==='Escape'){event.preventDefault();closeOptions();}else if(event.key==='Tab')closeOptions();else if(event.key.length===1){const offset=options.slice(activeOption+1).concat(options.slice(0,activeOption+1));const match=offset.find(o=>o.textContent.toLocaleLowerCase('pt-BR').startsWith(event.key.toLocaleLowerCase('pt-BR')));if(match){event.preventDefault();if(!open)openOptions();setActiveOption(options.indexOf(match));}}});
document.addEventListener('click',event=>{if(!event.target.closest('.custom-select'))closeOptions();});
const recipient=String(window.LETICIA_FORM_CONFIG?.recipient||'').trim();
const recipientConfigured=isValidEmail(recipient)||/^[a-f0-9]{32}$/i.test(recipient);
if(recipientConfigured)form.action='https://formsubmit.co/'+encodeURIComponent(recipient);
function showStatus(message,error=false){status.textContent=message;status.classList.toggle('is-error',error);status.focus({preventScroll:true});}
form.addEventListener('submit',async event=>{
 event.preventDefault();if(submitting)return;
 nameField.setCustomValidity(nameField.value.trim()?'':'Digite seu nome.');validateEmail();validatePhone();
 if(!form.reportValidity())return;
 if(!interest.value){interestError.textContent='Escolha um assunto para sua mensagem.';trigger.setAttribute('aria-invalid','true');trigger.focus();return;}
 if(!recipientConfigured){showStatus('O envio por e-mail ainda não está disponível. Você pode falar com a Letícia pelo WhatsApp.',true);return;}
 const data=new FormData(form);if(data.get('_honey'))return;
 const payload=Object.fromEntries(data.entries());payload.nome=nameField.value.trim();payload.email=email.value.trim();payload._replyto=payload.email;
 submitting=true;submitButton.disabled=true;submitLabel.textContent='Enviando…';form.setAttribute('aria-busy','true');status.textContent='';
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(recipient),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal});const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Submission rejected');
 form.reset();interest.value='';document.getElementById('interest-value').textContent='Escolha o assunto';options.forEach(option=>option.setAttribute('aria-selected','false'));closeOptions();showStatus('Mensagem enviada! Obrigada pelo contato.');
 }catch{showStatus('Não foi possível confirmar o envio. Seus dados continuam no formulário. Tente novamente ou fale pelo WhatsApp.',true);}
 finally{clearTimeout(timeout);submitting=false;submitButton.disabled=false;submitLabel.textContent='Enviar mensagem';form.removeAttribute('aria-busy');}
});
const bear=document.querySelector('.bear-corner');
const bearMessage=document.getElementById('bear-message');
function hideBear(){bearMessage.hidden=true;bear.setAttribute('aria-expanded','false');}
bear.addEventListener('click',()=>{const isHidden=bearMessage.hidden;bearMessage.hidden=!isHidden;bear.setAttribute('aria-expanded',String(isHidden));});
document.addEventListener('click',event=>{if(!event.target.closest('.bear-corner') && !event.target.closest('.bear-message'))hideBear();});
const privacy=document.getElementById('privacy-dialog');
document.querySelectorAll('[data-privacy]').forEach(button=>button.addEventListener('click',()=>privacy.showModal()));
privacy.querySelectorAll('.dialog-close,.dialog-done').forEach(button=>button.addEventListener('click',()=>privacy.close()));
privacy.addEventListener('click',event=>{if(event.target===privacy){const rect=privacy.getBoundingClientRect();if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)privacy.close();}});
document.getElementById('year').textContent=String(new Date().getFullYear());
