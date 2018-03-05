var validator = {
  form: {
    username: {
      status: false,
      errorMessage: '6~18位英文字母、数字或下划线，必须以英文字母开头'
    }, 
    password: {
      status: false,
      errorMessage: '密码为6~12位数字、大小写字母、中划线、下划线'
    }, 
    'repeat-password': {
      status: false,
      errorMessage: '两次输入的密码不一致'
    }, 
    sid: {
      status: false,
      errorMessage: '8位数字，不能以0开头'
    }, 
    phone: {
      status: false,
      errorMessage: '11位数字，不能以0开头'
    }, 
    email: {
      status: false,
      errorMessage: '请输入合法邮箱'
    }
  }, 

  findFormatErrors: function(user){
    var errorMesssages = [];
    for (var key in user) {
      if(Object.prototype.hasOwnProperty.call(user,key)){
        if (!validator.isFieldValid(key, user[key])) errorMesssages.push(validator.form[key].errorMessage);
      }
    }
    errorMesssages.length > 0 ? new Error(errorMesssages.join('<br />')) : null ;
  },

  isUsernameValid: function (username){
    return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{6,18}$/.test(username);
  },

  isPasswordValid: function (password){
    this.password = password;
    return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
  },

  isRepeatPasswordValid: function (repeatPassword){
    return this.form['repeat-password'].status = repeatPassword == this.password;
  },

  isSidValid: function (sid){
    return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
  },

  isPhoneValid: function (phone){
    return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
  },

  isEmailValid: function (email){
    return this.form.email.status = /^[a-zA-Z_\-]+@([a-zA-Z_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
  },

  isFieldValid: function(fieldname, value){
    var CapFiledname = capCamelize(fieldname);
    return this["is" + CapFiledname + 'Valid'](value);
  },

  isFormValid: function(){
    return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status &&
      this.form.password.status && ((typeof window !== 'object') || this.form['repeat-password'].status);
  },

  getErrorMessage: function(fieldname){
    return this.form[fieldname].errorMessage;
  },

  isAttrValueUnique: function(registry, user, attr){
    for (var key in registry) {
      if (Object.prototype.hasOwnProperty.call(registry,key) && registry[key][attr] == user[attr]) return false;
    }
    return true;
  }
}

if (typeof module == 'object') { // 服务端共享
  module.exports = validator
}

function capCamelize(str){
  return str.split(/[_\-]/).map(capitalize).join('');
}

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1, str.length);
}


