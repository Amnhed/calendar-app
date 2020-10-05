import React, {useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'


moment.locale('es')

const localizer = momentLocalizer(moment)


const myEventsList = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    notes:'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Amnhed'
    }

}]

export const CalendarScreen = () => {

    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );
    // Si el lastview esta vacio asigna month

    const onDoubleClick = (e) => {
        console.log(e);
    }

    const onSelectEvent = (e) => {
        console.log('on selected');
        console.log(e);
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
        //console.log(e);
    }

    //Personalizamos los estilos
    const eventStyleGetter = ( event, start, end, isSelected ) => {
        console.log(event, start, end, isSelected );
        const style = {
            backgroundcolor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return{
            style
        }
    }

    return (
        <div className='calendar-screen'>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages= { messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components = {{
                    event: CalendarEvent
                }}

            />
        </div>
    )
}
