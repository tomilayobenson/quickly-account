export const validateLoginForm = (values) => {
    const {email ,password} = values
      const errors = {}

      if(!email){
          errors.username = 'Required'
      }
       if(!password){
           errors.password ='Required'
       }else if(password.length < 8){
           errors.password ='Must be atleast 8 characters'
       } 
       return errors;
}