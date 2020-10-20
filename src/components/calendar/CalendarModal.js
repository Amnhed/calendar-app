import React, { useState } from 'react'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement('#root')

  //inicializo los minutos en 0 y agrego una hora
  const now = moment().minutes(0).seconds(0).add(1,'hours')
  const end_date = now.clone().add(1,'hours')
  //moment() 8:45:50

    //   Valores iniciales del formulario
    const initEvent = {
        title: '',
        notes: '',
        start: now.toDate(),
        end: end_date.toDate()
    }


export const CalendarModal = () => {
    const dispatch = useDispatch();

    // const [isOpen, setIsOpen] = useState(true)
    const { modalOpen } = useSelector( state => state.ui );
    const [dateStart, setDateStart] = useState( now.toDate() )
    const [dateEnd, setDateEnd] = useState( end_date.toDate() )
    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState( initEvent )

    const { notes, title, start, end } = formValues
    // del evento obtengo el target
    const handleInputChange = ({ target }) => {
        // ...formValues -> Es para mantener todos los demas valores del objeto formValues
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch( uiCloseModal() )
        setFormValues(initEvent)
        //setIsOpen(false)
    }

    const hanldeStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start:e
        })
    }

    const hanldeEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end:e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // convierto las fecha a un elemento moment
        const momentStart = moment( start )
        const momentEnd = moment( end )

        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error','la fecha final debe ser mayor a la fecha de inicio','error')
            
        }
        if(  title.trim().length < 2 ){
            return setTitleValid(false)
        }

        dispatch( eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '456',
                name: 'User456'
            }
        }) )

        setTitleValid(true)
        closeModal()
    }

    return (
        <Modal
        isOpen={ modalOpen }
        //   isOpen={ isOpen }
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        //   timepo de cierre en miliseg
          closeTimeoutMS={ 200 }
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={hanldeStartDateChange}
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ hanldeEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        // si no esta en verdadero
                        className={ `form-control ${ !titleValid && 'is-invalid ' } ` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
