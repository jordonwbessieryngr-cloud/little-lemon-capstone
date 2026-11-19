import {useEffect,useReducer,useRef,useState} from 'react';
import Field from '../components/Field.jsx';
import {initialBooking,localDate,OCCASIONS,initializeTimes,updateTimes,validateReservation,validateContact,submitBooking} from '../lib/booking.js';
const base = import.meta.env.BASE_URL;
function Summary({data}){return <aside className="summary" aria-label="Reservation summary"><img src={`${base}table.svg`} alt=""/><div><p className="eyebrow">YOUR TABLE</p><h2>Reservation details</h2><dl><div><dt>Date</dt><dd>{data.date || 'Not selected'}</dd></div><div><dt>Time</dt><dd>{data.time || 'Not selected'}</dd></div><div><dt>Guests</dt><dd>{data.guests}</dd></div><div><dt>Occasion</dt><dd>{data.occasion}</dd></div></dl><p className="muted">This is a demonstration. No actual restaurant booking is made.</p></div></aside>;}
export default function Booking({onConfirm}){
  const [data,setData]=useState(()=>initialBooking());
  const [times,dispatch]=useReducer(updateTimes,undefined,()=>initializeTimes());
  const [step,setStep]=useState(1); const [errors,setErrors]=useState({}); const [touched,setTouched]=useState({}); const [busy,setBusy]=useState(false); const [failure,setFailure]=useState('');
  const heading=useRef(null); const form=useRef(null);
  useEffect(()=>{heading.current?.focus();},[step]);
  const validate=(values)=>step===1?validateReservation(values):validateContact(values);
  function change(e){const {name,value}=e.target; const next={...data,[name]:value}; if(name==='date'){next.time=''; dispatch({type:'dateChanged',date:value});} setData(next); if(touched[name]||errors[name])setErrors(validate(next)); setFailure('');}
  function blur(e){const name=e.target.name;setTouched(t=>({...t,[name]:true}));const message=validate(data)[name];setErrors(prev=>({...prev,[name]:message}));}
  function inputProps(name){return {id:name,name,value:data[name],onChange:change,onBlur:blur,'aria-invalid':Boolean(errors[name]),'aria-describedby':errors[name]?`${name}-error`:name==='phone'?'phone-hint':undefined};}
  function focusError(next){const key=Object.keys(next).find(k=>next[k]); if(key) requestAnimationFrame(()=>form.current?.elements.namedItem(key)?.focus());}
  function nextStep(n){setStep(n);setTouched({});setErrors({});setFailure('');}
  async function handleSubmit(e){e.preventDefault();if(busy)return;const next=validate(data);setErrors(next);if(Object.keys(next).length){focusError(next);return;}if(step===1){nextStep(2);return;}const reservationErrors=validateReservation(data);if(Object.keys(reservationErrors).length){nextStep(1);setErrors(reservationErrors);setFailure('Your selected time is no longer available. Please choose another time.');return;}setBusy(true);setFailure('');try{const confirmed=await submitBooking(data);onConfirm(confirmed);}catch(err){setFailure(err.message||'We could not complete your reservation. Please try again.');}finally{setBusy(false);}}
  return <div className="container section booking-page"><a className="text-link" href="#/">← Back to home</a><p className="eyebrow">RESERVATIONS</p><h1>Reserve a table</h1><p className="lead">A great meal starts with a little planning.</p><ol className="steps" aria-label="Booking progress"><li aria-current={step===1?'step':undefined}><span>1</span> Table details</li><li aria-current={step===2?'step':undefined}><span>2</span> Your details</li><li><span>3</span> Confirmed</li></ol><div className="booking-layout"><section className="form-card"><h2 ref={heading} tabIndex={-1}>{step===1?'Choose your table':'Review & confirm'}</h2><p className="muted">Fields marked * are required.</p><form ref={form} noValidate onSubmit={handleSubmit} aria-busy={busy}>{step===1?<>
    <Field name="date" label="Date *" error={errors.date}><input {...inputProps('date')} type="date" min={localDate()} required/></Field>
    <Field name="time" label="Time *" error={errors.time}><select {...inputProps('time')} required><option value="">Select a time</option>{times.map(t=><option key={t}>{t}</option>)}</select>{!times.length&&<small role="status">No available times. Try another date.</small>}</Field>
    <Field name="guests" label="Number of guests *" error={errors.guests}><select {...inputProps('guests')} required>{Array.from({length:8},(_,i)=><option key={i+1} value={i+1}>{i+1} {i===0?'guest':'guests'}</option>)}</select></Field>
    <Field name="occasion" label="Occasion *" error={errors.occasion}><select {...inputProps('occasion')}>{OCCASIONS.map(o=><option key={o}>{o}</option>)}</select></Field>
  </>:<>
    <Field name="name" label="Full name *" error={errors.name}><input {...inputProps('name')} autoComplete="name" placeholder="Alex Morgan" required/></Field>
    <Field name="email" label="Email address *" error={errors.email}><input {...inputProps('email')} type="email" autoComplete="email" placeholder="alex@example.com" required/></Field>
    <Field name="phone" label="Phone number (optional)" error={errors.phone} hint="Include country code if necessary."><input {...inputProps('phone')} type="tel" autoComplete="tel" placeholder="+1 555 123 4567"/></Field>
    <p className="review-note">Review your reservation summary before confirming.</p>
  </>}{failure&&<p role="alert" className="field-error">{failure}</p>}<div className="form-actions">{step===2&&<button className="button secondary" type="button" disabled={busy} onClick={()=>nextStep(1)}>Back</button>}<button className="button" type="submit" disabled={busy}>{busy?'Confirming…':step===1?'Continue':'Confirm reservation'}</button></div></form></section><Summary data={data}/></div></div>;
}
