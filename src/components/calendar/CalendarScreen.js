import React, {useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'


moment.locale('es')

const localizer = momentLocalizer(moment)



// const myEventsList = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     notes:'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Amnhed'
//     }

// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events } = useSelector( state => state.calendar );
    


    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );
    // Si el lastview esta vacio asigna month

    const onDoubleClick = (e) => {
        console.log(e);
        dispatch( uiOpenModal() )

    }

    const onSelectEvent = (e) => {
        console.log('on selected');
        console.log(e);
        dispatch( eventSetActive(e) )

        //dispatch( uiOpenModal() )
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
                events={events}
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
            <AddNewFab/>
            <CalendarModal/>
        </div>
    )
}
