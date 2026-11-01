const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}

const skins={purple:{name:'暮蓝',caption:'安静，也很有存在感。',alt:'双键蓝色皮肤的真实键盘界面'},forest:{name:'森野',caption:'给每次表达，一点清新。',alt:'双键绿色花朵皮肤的真实键盘界面'},mechanical:{name:'机械',caption:'把喜欢的质感，带到指尖。',alt:'双键机械风格皮肤的真实键盘界面'},outline:{name:'青影',caption:'轻盈线条，清晰落键。',alt:'双键绿色描边皮肤的真实键盘界面'},classic:{name:'极简',caption:'让表达，成为唯一的主角。',alt:'双键黑白极简皮肤的真实键盘界面'}};
const skinImage=document.querySelector('#skin-image');let skinTimer;
Object.keys(skins).forEach(name=>{const preloader=new Image();preloader.src=`./assets/keyboard-${name}.webp`});
document.querySelectorAll('[data-skin]').forEach(button=>button.addEventListener('click',()=>{
  const name=button.dataset.skin;
  document.querySelectorAll('[data-skin]').forEach(el=>{const selected=el===button;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected))});
  document.querySelector('#style').dataset.theme=name;
  const label=document.querySelector('#skin-name');label.replaceChildren(document.createTextNode(skins[name].name+' '));const caption=document.createElement('span');caption.textContent=skins[name].caption;label.append(caption);
  clearTimeout(skinTimer);skinImage.classList.add('switching');
  skinTimer=setTimeout(()=>{skinImage.src=`./assets/keyboard-${name}.webp`;skinImage.alt=skins[name].alt;skinImage.classList.remove('switching')},reduceMotion?0:160);
}));

const words=[{char:'双',pinyin:'shuāng',keys:['U','L'],parts:['sh','uang']},{char:'拼',pinyin:'pīn',keys:['P','B'],parts:['p','in']},{char:'键',pinyin:'jiàn',keys:['J','M'],parts:['j','ian']}];
let activeWord=0;let timers=[];let demoTouched=false;
function demo(index){
  timers.forEach(clearTimeout);timers=[];activeWord=index;const word=words[index];
  document.querySelectorAll('[data-word]').forEach((button,i)=>{button.classList.toggle('active',index===i);button.setAttribute('aria-pressed',String(index===i))});
  const keys=[document.querySelector('#first-key'),document.querySelector('#second-key')];
  keys.forEach((el,i)=>{el.classList.remove('pressed');el.querySelector('b').textContent=word.keys[i];el.querySelector('span').textContent=word.parts[i]});
  document.querySelector('#result-char').textContent=word.char;document.querySelector('#result-pinyin').textContent=word.pinyin;
  document.querySelector('#demo-description').textContent=`${word.parts[0]} + ${word.parts[1]}，一声「${word.char}」。`;
  const result=document.querySelector('.demo-result');result.classList.remove('flash');
  if(!reduceMotion){[[100,()=>keys[0].classList.add('pressed')],[400,()=>keys[0].classList.remove('pressed')],[550,()=>keys[1].classList.add('pressed')],[850,()=>{keys[1].classList.remove('pressed');result.classList.add('flash')}],[1150,()=>result.classList.remove('flash')]].forEach(([delay,fn])=>timers.push(setTimeout(fn,delay)))}
}
document.querySelectorAll('[data-word]').forEach(button=>button.addEventListener('click',()=>{demoTouched=true;demo(Number(button.dataset.word))}));
document.querySelector('#replay-demo').addEventListener('click',()=>{demoTouched=true;demo(activeWord)});
if('IntersectionObserver' in window){const demoObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){if(!demoTouched)demo(0);demoObserver.disconnect()}},{threshold:.5});demoObserver.observe(document.querySelector('.input-demo'))}

const filmDialog=document.querySelector('#film-dialog');const guideDialog=document.querySelector('#guide-dialog');const video=filmDialog.querySelector('video');
function openDialog(dialog){dialog.showModal();document.body.classList.add('modal-open')}
function closeDialog(dialog){if(dialog===filmDialog)video.pause();dialog.close()}
document.querySelectorAll('[data-film]').forEach(button=>button.addEventListener('click',()=>{openDialog(filmDialog);video.play().catch(()=>{})}));
document.querySelectorAll('[data-guide]').forEach(button=>button.addEventListener('click',()=>openDialog(guideDialog)));
filmDialog.addEventListener('cancel',()=>video.pause());
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>closeDialog(dialog));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog)}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(dialog===filmDialog)video.pause()});
});
document.querySelector('.guide-done').addEventListener('click',()=>closeDialog(guideDialog));
