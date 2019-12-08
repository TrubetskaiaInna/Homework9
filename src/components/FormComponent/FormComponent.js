import React, { Component } from 'react'
import './FormComponent.sass'
import SimpleSnackbar from '../MessageComponent/MessageComponent'

const initialState = {
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  userName: '',
  userNameError: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  confirmPassword: '',
  confirmPasswordError: '',
  region: '',
  sex: {
    man: false,
    woman: false
  },
  emailPermission: false,
  additionalInfo: '',
  disabled: true,
  photoFile: null,
  photoFileError: ''
}

let shownModalWindow = false

class FormComponent extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
    this.fileInput = React.createRef()
  }

  isValidForm = () => {
    if (this.state.firstName && this.state.lastName && this.state.userName && this.state.email
      && this.state.password && this.state.confirmPassword && this.state.region && (this.state.sex.woman
        || this.state.sex.man) && !this.state.emailError && !this.state.passwordError
      && !this.state.confirmPasswordError && !this.state.firstNameError && !this.state.lastNameError
      && !this.state.userNameError && !this.state.photoFileError) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }

  isValidPassword = () => {
    if (this.state.password !== this.state.confirmPassword){
      this.setState({ confirmPasswordError: 'Password does not match'}, this.isValidForm)
    }
    else {
      this.setState({ confirmPasswordError: ''}, this.isValidForm)
    }
  }

  onLabelChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      this.isValidForm()
    })
  }

  onLabelChangeFirsName = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      let re = new RegExp('^[a-zA-Z0-9]+$')
      let result = re.test(this.state.firstName)
      if (!result) {
        this.setState({ firstNameError: 'first name can only contain numbers and letters' }, this.isValidForm)
      } else {
        this.setState({ firstNameError: '' }, this.isValidForm)
      }
    })
  }

  onLabelChangeLastName = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      let re = new RegExp('^[a-zA-Z0-9]+$')
      let result = re.test(this.state.lastName)
      if (!result) {
        this.setState({ lastNameError: 'last name can only contain numbers and letters' }, this.isValidForm)
      } else {
        this.setState({ lastNameError: '' }, this.isValidForm)
      }
    })
  }

  onLabelChangeUserName = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      let re = new RegExp('^[a-zA-Z0-9]+$')
      let result = re.test(this.state.userName)
      if (!result) {
        this.setState({ userNameError: 'user name can only contain numbers and letters' }, this.isValidForm)
      } else {
        this.setState({ userNameError: '' }, this.isValidForm)
      }
    })
  }

  onLabelChangeEmail = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      let re = new RegExp('^([A-Za-z0-9_\\-.])+@([A-Za-z0-9_\\-.])+\\.([A-Za-z]{2,4})$')
      let result = re.test(this.state.email)
      if (!result) {
        this.setState({ emailError: 'Enter valid email' }, this.isValidForm)
      } else {
        this.setState({ emailError: '' }, this.isValidForm)
      }
    })
  }

  onLabelChangePassword = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      if (this.state.password.length <= 9) {
        this.setState({ passwordError: 'Password must contain at least 10 characters' },
          this.isValidPassword )
      } else {
        this.setState({ passwordError: '' },
          this.isValidPassword)
      }
    })
  }

  onLabelChangeConfPassword = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    }, () => {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ confirmPasswordError: 'Password does not match' }, this.isValidForm)
      } else {
        this.setState({ confirmPasswordError: '' }, this.isValidForm)
      }
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
    }, () => {
      this.isValidForm()
    })
  }

  isValidFile = (e) => {
    let file = e.target.files[0]
    if (file && file.type !== ('image/jpeg' || 'image.png')) {
      this.setState({ photoFileError: 'Incorrect file format selected, choose jpeg or png' }, this.isValidForm)
    } else {
      this.setState({ photoFileError: '' }, this.isValidForm)
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    shownModalWindow = !shownModalWindow
    let myData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      region: this.state.region,
      sex: this.state.sex,
      emailPermission: this.state.emailPermission,
      additionalInfo: this.state.additionalInfo,
    }
    if (this.fileInput.current && this.fileInput.current.files[0]) {
      myData.photoFile = this.fileInput.current.files[0]
    }
    console.log(myData)
    this.setState(initialState)
    this.fileInput.current.value = null
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
                onChange={this.onLabelChangeFirsName}
                placeholder='Enter first name'/>
              <div className='wrapperError'>
                <p>{this.state.firstNameError}</p>
              </div>
            </div>

            <div className='lastName'>
              <span> <span className='important'> * </span>Last name:</span>
              <input
                name="lastName"
                className='inputLastName'
                value={this.state.lastName}
                type="text"
                onChange={this.onLabelChangeLastName}
                placeholder='Enter last name'/>
              <div className='wrapperError'>
                <p>{this.state.lastNameError}</p>
              </div>
            </div>

            <div className='userName'>
              <span> <span className='important'> * </span>User name:</span>
              <input
                name="userName"
                className='inputUserName'
                value={this.state.userName}
                type="text"
                onChange={this.onLabelChangeUserName}
                placeholder='Enter user name'/>
              <div className='wrapperError'>
                <p>{this.state.userNameError}</p>
              </div>
            </div>

            <div className='email'>
              <span> <span className='important'> * </span> Email: </span>
              <input
                name="email"
                className='inputEmail'
                value={this.state.email}
                type="text"
                onChange={this.onLabelChangeEmail}
                placeholder='Enter email'/>
              <div className='wrapperError'>
                <p>{this.state.emailError}</p>
              </div>
            </div>

            <div className='password'>
              <span> <span className='important'> * </span> Password: </span>
              <input className='inputPassword'
                     type="password"
                     value={this.state.password}
                     name="password"
                     onChange={this.onLabelChangePassword}
                     placeholder='Enter password'/>
              <div className='wrapperError'>
                <p>{this.state.passwordError}</p>
              </div>
            </div>

            <div className='confirmPassword'>
              <span> <span className='important'> * </span>Confirm password: </span>
              <input
                value={this.state.confirmPassword}
                name="confirmPassword"
                className='inputConfirmPassword'
                type="password"
                onChange={this.onLabelChangeConfPassword}
                placeholder='Enter password'/>
              <div className='wrapperError'>
                <p>{this.state.confirmPasswordError}</p>
              </div>
            </div>

            <div className='region'>
              <span> <span className='important'> * </span>Region:</span>
              <select
                value={this.state.region}
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
                value={this.state.emailPermission}
                checked={this.state.emailPermission}
                name='emailPermission'
                type="checkbox"
                onChange={this.handleCheckbox}/>
            </div>

            <div className='info'>
              <span>Additional info:</span>
              <textarea
                value={this.state.additionalInfo}
                name='additionalInfo'
                onChange={this.onLabelChange}
                className='inputInfo'></textarea>
            </div>

            <div className='photo'>
              <span> Upload photo:</span>
              <input onChange={this.isValidFile} className='file' type="file" ref={this.fileInput}/>
              <div className='wrapperError'>
                <p>{this.state.photoFileError}</p>
              </div>
            </div>
          </label>

          <div className='wrapperButton'>
            <input disabled={this.state.disabled} className='button' type="submit" value="Submit"/>
          </div>

          <span className='infoUser'>* field is required</span>
        </form>

        {shownModalWindow ? <SimpleSnackbar onSubmit={this.onSubmit}/> : null}
      </div>
    )
  }
}

export default FormComponent
