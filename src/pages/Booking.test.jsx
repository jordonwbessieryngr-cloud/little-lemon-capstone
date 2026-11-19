import React from 'react';
import {test,expect,vi,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Booking from './Booking.jsx';
import {localDate} from '../lib/booking.js';
afterEach(cleanup);
test('renders a labeled date field and prevents proceeding without a time',()=>{render(<Booking onConfirm={vi.fn()}/>);expect(screen.getByLabelText('Date *')).toBeRequired();fireEvent.click(screen.getByRole('button',{name:'Continue'}));expect(screen.getByText('Choose an available time.')).toBeInTheDocument();});
test('selecting details opens contact step and validates email',()=>{render(<Booking onConfirm={vi.fn()}/>);const future=new Date();future.setDate(future.getDate()+1);fireEvent.change(screen.getByLabelText('Date *'),{target:{value:localDate(future)}});fireEvent.change(screen.getByLabelText('Time *'),{target:{value:'18:00'}});fireEvent.click(screen.getByRole('button',{name:'Continue'}));expect(screen.getByLabelText('Email address *')).toBeRequired();fireEvent.click(screen.getByRole('button',{name:'Confirm reservation'}));expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();});
