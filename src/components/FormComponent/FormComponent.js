import React, { Component } from 'react'
import './FormComponent.sass'


const initialState = {
  firstName: '',
  firstNameError: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  region: '',
  sex: {
    man: false,
    woman: false
  },
  emailPermission: false,
  additionalInfo: '',
  disabled: true,
}

class FormComponent extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }



  render () {
    return (
      <div className='wrapperForm'>
111
      </div>
    )
  }
}

export default FormComponent
