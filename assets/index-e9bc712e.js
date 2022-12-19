(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function c(){}function R(e){return e()}function F(){return Object.create(null)}function m(e){e.forEach(R)}function A(e){return typeof e=="function"}function H(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function q(e){return Object.keys(e).length===0}function S(e,t){e.appendChild(t)}function M(e,t,n){e.insertBefore(t,n||null)}function v(e){e.parentNode&&e.parentNode.removeChild(e)}function w(e){return document.createElement(e)}function D(e){return document.createTextNode(e)}function Y(){return D(" ")}function $(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function G(e){return Array.from(e.childNodes)}let T;function h(e){T=e}const f=[],C=[],g=[],O=[],V=Promise.resolve();let P=!1;function W(){P||(P=!0,V.then(K))}function x(e){g.push(e)}const p=new Set;let u=0;function K(){const e=T;do{for(;u<f.length;){const t=f[u];u++,h(t),X(t.$$)}for(h(null),f.length=0,u=0;C.length;)C.pop()();for(let t=0;t<g.length;t+=1){const n=g[t];p.has(n)||(p.add(n),n())}g.length=0}while(f.length);for(;O.length;)O.pop()();P=!1,p.clear(),h(e)}function X(e){if(e.fragment!==null){e.update(),m(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(x)}}const y=new Set;let J;function L(e,t){e&&e.i&&(y.delete(e),e.i(t))}function Q(e,t,n,i){if(e&&e.o){if(y.has(e))return;y.add(e),J.c.push(()=>{y.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function U(e){e&&e.c()}function z(e,t,n,i){const{fragment:s,after_update:o}=e.$$;s&&s.m(t,n),i||x(()=>{const r=e.$$.on_mount.map(R).filter(A);e.$$.on_destroy?e.$$.on_destroy.push(...r):m(r),e.$$.on_mount=[]}),o.forEach(x)}function B(e,t){const n=e.$$;n.fragment!==null&&(m(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Z(e,t){e.$$.dirty[0]===-1&&(f.push(e),W(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function I(e,t,n,i,s,o,r,_=[-1]){const d=T;h(e);const a=e.$$={fragment:null,ctx:[],props:o,update:c,not_equal:s,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(d?d.$$.context:[])),callbacks:F(),dirty:_,skip_bound:!1,root:t.target||d.$$.root};r&&r(a.root);let E=!1;if(a.ctx=n?n(e,t.props||{},(l,N,...k)=>{const b=k.length?k[0]:N;return a.ctx&&s(a.ctx[l],a.ctx[l]=b)&&(!a.skip_bound&&a.bound[l]&&a.bound[l](b),E&&Z(e,l)),N}):[],a.update(),E=!0,m(a.before_update),a.fragment=i?i(a.ctx):!1,t.target){if(t.hydrate){const l=G(t.target);a.fragment&&a.fragment.l(l),l.forEach(v)}else a.fragment&&a.fragment.c();t.intro&&L(e.$$.fragment),z(e,t.target,t.anchor,t.customElement),K()}h(d)}class j{$destroy(){B(this,1),this.$destroy=c}$on(t,n){if(!A(n))return c;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!q(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}class ee{constructor(){this.handpose,this.predictions=[],this.fingers={},this.curledFingers=new Set,this.startMessage="Hand Model Loading Please Wait"}setupHandpose(t,n,i){i.size(t,n),this.handpose=ml5.handpose(i,{flipHorizontal:!0},()=>{this.startMessage="Click To Start",console.log("Model Ready")}),this.getPredictions(),i.hide()}getPredictions(){this.handpose.on("predict",t=>{this.predictions=t})}addPointsToFingers(t){this.fingers.thumb=[t.thumb[2],t.thumb[3]],this.fingers.index=[t.indexFinger[2],t.indexFinger[3]],this.fingers.middle=[t.middleFinger[2],t.middleFinger[3]],this.fingers.ring=[t.ringFinger[2],t.ringFinger[3]],this.fingers.pinky=[t.pinky[2],t.pinky[3]]}draw(t){for(let n=0;n<this.predictions.length;n+=1){const i=this.predictions[n].annotations;this.addPointsToFingers(i);for(let s in this.fingers)this.fingers[s].forEach(o=>{t.fill(0,255,0),t.noStroke(),t.ellipse(o[0],o[1],10,10)})}}checkFingerPositions(){for(let t in this.fingers){const n=this.fingers[t][0][1],i=this.fingers[t][1][1];n-10<=i+10?this.curledFingers.add(t):this.curledFingers.delete(t)}}}class te{constructor(t,n,i,s,o,r){this.x=t,this.y=n,this.width=i,this.height=s,this.note=o,this.colour=r,this.fingersOnNote=new Set,this.oscillator=new Tone.PolySynth().toDestination()}draw(t){t.fill(255),t.stroke(0),t.rect(this.x,this.y,this.width,this.height)}detectFingers(t){for(let n in t){const i=t[n][0][0],s=t[n][0][1];i-10>this.x&&i+10<this.x+this.width&&s-10>this.y&&s+10<this.y+this.height?this.fingersOnNote.add(n):this.fingersOnNote.delete(n)}}}class ne{constructor(){this.keys=[],this.notes=["C4","D4","E4","F4","G4","A4","B4","C4"],this.notesToPlay=new Set,this.notesPlaying=new Set,this.notesToRelease=new Set}createKeys(){for(let t=0;t<this.notes.length;t++){let n=new te(t*80,0,80,480,this.notes[t],"white");this.keys.push(n)}}drawKeys(t){this.keys.forEach(n=>{n.draw(t)})}playNotes(){console.log(this.notesToPlay),this.notesToPlay.size>0&&(this.keys.forEach(t=>{this.notesToPlay.has(t.note)&&t.oscillator.triggerAttack(t.note)}),this.notesPlaying=new Set(this.notesToPlay),this.notesToPlay.clear())}releaseNotes(){this.notesToRelease.size>0&&(this.keys.forEach(t=>{this.notesToRelease.has(t.note)&&t.oscillator.triggerRelease(t.note)}),this.notesToRelease.clear())}checkNotesToPlay(t){this.keys.forEach(n=>{this.notesPlaying.has(n.note)||t.forEach(i=>{n.fingersOnNote.has(i)&&this.notesToPlay.add(n.note)})}),this.playNotes()}checkNotesReleased(t){this.keys.forEach(n=>{let i=!0;this.notesPlaying.has(n.note)&&t.forEach(s=>{n.fingersOnNote.has(s)&&(i=!1)}),i&&(this.notesPlaying.delete(n.note),this.notesToRelease.add(n.note))}),this.releaseNotes()}}const se=e=>{e.state="start",e.hand,e.piano,e.container,e.setup=()=>{e.createCanvas(640,480).parent(e.container);const n=e.createCapture(e.VIDEO);e.hand.setupHandpose(e.width,e.height,n),e.piano.createKeys()},e.draw=()=>{switch(e.fill(0),e.rect(0,0,640,480),e.state){case"start":e.drawStart();break;case"piano":e.drawPiano(),console.log(e.piano.notesPlaying);break;default:console.log(`The state ${e.state} doesn't exist`);break}},e.drawPiano=()=>{e.piano.drawKeys(e),e.hand.draw(e),e.hand.checkFingerPositions(),e.piano.keys.forEach(t=>{t.detectFingers(e.hand.fingers)}),e.piano.checkNotesToPlay(e.hand.curledFingers),e.piano.checkNotesReleased(e.hand.curledFingers)},e.drawStart=()=>{e.fill(255),e.noStroke(),e.textAlign(e.CENTER,e.CENTER),e.text(e.hand.startMessage,e.width/2,e.height/2),e.mouseIsPressed&&(e.state="piano")}};function ie(e){let t;return{c(){t=w("div"),t.innerHTML=`<div class="p5-container svelte-kpn7pf" id="pianoContainer"></div> 
    <div class="p5-container svelte-kpn7pf" id="mobilePianoContainer"></div>`,$(t,"class","svelte-kpn7pf")},m(n,i){M(n,t,i)},p:c,i:c,o:c,d(n){n&&v(t)}}}function oe(e){const t=new p5(se);return t.hand=new ee,t.piano=new ne,t.container="pianoContainer",[]}class re extends j{constructor(t){super(),I(this,t,oe,ie,H,{})}}function ae(e){let t,n,i,s,o;return s=new re({}),{c(){t=w("main"),n=w("h1"),n.textContent="Hand Piano",i=Y(),U(s.$$.fragment),$(n,"class","svelte-qd6da0"),$(t,"class","svelte-qd6da0")},m(r,_){M(r,t,_),S(t,n),S(t,i),z(s,t,null),o=!0},p:c,i(r){o||(L(s.$$.fragment,r),o=!0)},o(r){Q(s.$$.fragment,r),o=!1},d(r){r&&v(t),B(s)}}}class le extends j{constructor(t){super(),I(this,t,null,ae,H,{})}}new le({target:document.getElementById("app")});