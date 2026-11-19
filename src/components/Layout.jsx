import { useState } from 'react';
const base = import.meta.env.BASE_URL;
export function Logo() {return <a href="#/" className="logo" aria-label="Little Lemon home"><img src={`${base}lemon.svg`} alt="" width="40" height="40"/><span>LITTLE <strong>LEMON</strong><small>CHICAGO</small></span></a>;}
export function Header({route}) {
  const [open,setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Logo/><button type="button" className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="site-nav" onClick={()=>setOpen(!open)}>☰</button><nav id="site-nav" aria-label="Main navigation" className={open?'nav open':'nav'}><a href="#/" aria-current={route==='/'?'page':undefined} onClick={()=>setOpen(false)}>Home</a><a href="#/menu" aria-current={route==='/menu'?'page':undefined} onClick={()=>setOpen(false)}>Menu</a><a href="#/about" aria-current={route==='/about'?'page':undefined} onClick={()=>setOpen(false)}>About</a><a className="button small" href="#/booking" aria-current={route==='/booking'?'page':undefined} onClick={()=>setOpen(false)}>Reserve a table</a></nav></div></header>;
}
export function Footer(){return <footer className="site-footer"><div className="container footer-inner"><Logo/><div><strong>Visit us</strong><p>Chicago, Illinois<br/>Mediterranean kitchen</p></div><div><strong>Reservations</strong><p>Daily · 5–9 pm<br/><a href="#/booking">Book a table</a></p></div><small>Educational demonstration · No real reservations</small></div></footer>;}
