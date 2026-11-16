'use strict';
document.addEventListener('click',event=>{
 const menu=event.target.closest('.menu-toggle');if(menu){const nav=document.getElementById('site-navigation');const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);return;}
 const photo=event.target.closest('[data-photo]');if(photo){const dialog=document.getElementById('photo-dialog');const img=document.getElementById('photo-expanded');img.src=photo.dataset.photo;img.alt=photo.dataset.caption;document.getElementById('photo-caption').textContent=photo.dataset.caption;dialog.showModal();return;}
 if(event.target.closest('.close-photo'))document.getElementById('photo-dialog').close();
});
function quoteMessage(f){return 'Olá! Gostaria de uma proposta da Aliança.\nNome: '+f.elements.nome.value+'\nImóvel: '+f.elements.tipo.value+'\nRegião: '+f.elements.regiao.value+'\nAlarme: '+(f.elements.alarme?.value||'Não informado')+'\nE-mail para retorno: '+(f.elements.email?.value||'Não informado')+'\nTelefone: '+(f.elements.telefone?.value||'Não informado')+'\nNecessidade: '+f.elements.detalhes.value;}
function prepareQuote(f){
 const feedback=document.getElementById('lead-feedback');if(feedback)feedback.textContent='Confira a mensagem no WhatsApp e toque em enviar.';
 return 'https://wa.me/5561984005431?text='+encodeURIComponent(quoteMessage(f));
}
document.addEventListener('click',event=>{
 const action=event.target.closest('[data-quote-channel]');if(!action)return;
 const form=document.getElementById('leadform');if(!form)return;
 if(!form.reportValidity()){event.preventDefault();return;}
 if(action.dataset.quoteChannel==='email'){
  if(typeof window.renderPublicPreview==='function'||location.protocol==='file:'){
   event.preventDefault();document.getElementById('lead-feedback').textContent='O envio direto está preparado no HTML para o GitHub. Teste no site publicado: esta prévia não envia e-mails.';return;
  }
  form.elements._url.value=location.href.split('#')[0];form.elements._next.value=new URL('orcamento-recebido.html',location.href).href;
  return; // Submit HTTPS normal ao FormSubmit, sem abrir mailto ou Gmail.
 }
 action.href=prepareQuote(form);
});
