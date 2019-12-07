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
    this.fileInput = React.createRef()
  }


  onLabelChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  handleCheckbox = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.checked
    })
  }

  handleRadio = (e) => {
    let man
    let woman
    if (e.target.name === 'man') {
      man = e.target.checked
      woman = !e.target.checked
    } else {
      man = !e.target.checked
      woman = e.target.checked
    }
    this.setState({
      sex: { man, woman }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let myData = {
      firstName: this.state.firstName,
      error: this.state.firstNameError,
      lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      region: this.state.region,
      sex: this.state.sex,
      emailPermission: this.state.emailPermission,
      additionalInfo: this.state.additionalInfo,
      fotoFile: null,
    }
    if (this.fileInput.current && this.fileInput.current.files[0]) {
      myData.fotoFile = this.fileInput.current.files[0]
    }
    console.log(myData)
    this.setState(initialState)
  }


  render () {
    return (
      <div className='wrapperForm'>
        <form
          onSubmit={this.onSubmit}>
          <label>
            <div className='firstName'>
              <span> <span className='important'> * </span> First name: </span>
              <input
                name="firstName"
                className='inputFirstName'
                type="text"
                value={this.state.firstName}
                onChange={this.onLabelChange}
                placeholder='Enter first name'/>
            </div>
            <div className='lastName'>
              <span> <span className='important'> * </span>Last name:</span>
              <input
                name="lastName"
                className='inputLastName'
                type="text"
                onChange={this.onLabelChange}
                placeholder='Enter last name'/>
            </div>
            <div className='userName'>
              <span> <span className='important'> * </span>User name:</span>
              <input
                name="userName"
                className='inputUserName'
                type="text"
                onChange={this.onLabelChange}
                placeholder='Enter user name'/>
            </div>
            <div className='email'>
              <span> <span className='important'> * </span> Email: </span>
              <input
                name="email"
                className='inputEmail'
                type="text"
                onChange={this.onLabelChange}
                placeholder='Enter email'/>
            </div>
            <div className='password'>
              <span> <span className='important'> * </span> Password: </span>
              <input className='inputPassword'
                     type="password"
                     name="password"
                     onChange={this.onLabelChange}
                     placeholder='Enter password'/>
            </div>
            <div className='confirmPassword'>
              <span> <span className='important'> * </span>Confirm password: </span>
              <input
                name="confirmPassword"
                className='inputConfirmPassword'
                type="password"
                onChange={this.onLabelChange}
                placeholder='Enter password'/>
            </div>
            <div className='region'>
              <span> <span className='important'> * </span>Region selector:</span>
              <select
                name='region'
                className='select'
                onChange={this.onLabelChange}>
                <option>select region</option>
                <option>111</option>
                <option>222</option>
                <option>333</option>
                <option>444</option>
              </select>
            </div>
            <div className='sex'>
              <span> <span className='important'> * </span> Sex: </span>
              <div className='wrapperRadio'>
                <span> woman </span>
                <input type="radio"
                       name="woman"
                       checked={this.state.sex.woman}
                       onChange={this.handleRadio}/>
                <span>man</span>
                <input type="radio"
                       name="man"
                       checked={this.state.sex.man}
                       onChange={this.handleRadio}/>
              </div>
            </div>
            <div className='emails'>
              <span>Send me promotional emails:</span>
              <input
                name='emailPermission'
                type="checkbox"
                onClick={this.handleCheckbox}/>
            </div>
            <div className='info'>
              <span>Additional info:</span>
              <textarea
                name='additionalInfo'
                onChange={this.onLabelChange}
                className='inputInfo'></textarea>
            </div>
            <div className='foto'>
              <span> Upload foto:</span>
              <input type="file" ref={this.fileInput}/>
            </div>
          </label>
          <div className='wrapperButton'>
            <input disabled={this.state.disabled} className='button' type="submit" value="Submit"/>
          </div>
          <span className='infoUser'>* field is required</span>
        </form>

      </div>
    )
  }
}

export default FormComponent