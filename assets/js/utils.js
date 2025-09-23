export function getParam(name){ const url=new URL(window.location.href); return url.searchParams.get(name); }
export function el(tag, attrs={}, children=[]){
  const node=document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{ if(k==='class') node.className=v; else if(k==='text') node.textContent=v;
    else if(k.startsWith('on') && typeof v==='function') node.addEventListener(k.slice(2), v); else node.setAttribute(k,v); });
  (Array.isArray(children)?children:[children]).forEach(ch=>{ if(typeof ch==='string') node.appendChild(document.createTextNode(ch)); else if(ch) node.appendChild(ch); });
  return node;
}
