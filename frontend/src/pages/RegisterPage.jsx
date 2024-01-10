function RegisterPage() {
    const [cleanPassword, setCleanPassword] = useState({ message: '', status: false, color: 'red' })

    const checkPasswordStrength = (password) => {
      const passwordRegex = {
        strong: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        medium: /(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/,
      };
  
      if (passwordRegex.strong.test(password)) {
        return { message: 'Hehh you got the strong one..!😲', status: true, color: 'blue' };
      } else if (passwordRegex.medium.test(password)) {
        return { message: 'Emmm that\'s a good one..!🥰', status: true, color: 'green' };
      } else {
        return { message: 'Too weak..!🙁', status: false, color: 'red' };
      }
  };
  
  
    const validatePassword = (password) => {
      setCleanPassword(checkPasswordStrength(password))
      setPassword(password)
    }
    return (
        <>
            RegisterPage
        </>
    )   
}

export default RegisterPage