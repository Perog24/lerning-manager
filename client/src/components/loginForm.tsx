import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../constants/constants';
import bcrypt from 'bcryptjs';
import { useNavigate} from 'react-router-dom'; 

interface User {
  userName: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleLogin = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
   const user: Partial<User> =  {email, password};
    const response = await axios.post(url+'/login', user)
    if (response.status === 200) {
      console.log('response-data', response.data);      
     return navigate(`/main/${response.data.id}`);
    }
    if (response.status === 201) {
      console.log("Worked");    
      alert('Неправильний email або пароль');
      setUserName("");
      setEmail("");
      setPassword("");
      return;
    }
  } catch (error) {
    console.error("Error logining", error);
  }
  };

  const handleRegister = async () => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    // Додавання нового користувача
    const newUser: User = { userName, email, password: hashedPassword };
    axios.post(url+'/users', newUser);
    // setUsers([...users, newUser]);
  };

  return (
    <div className='loginForm'>
      <form>
        <h2>Вхід або Реєстрація</h2>
      <input 
        type="text"
        placeholder='User Name'
        name='username'
        value={userName}
        onChange={(e)=> setUserName(e.target.value)}
          />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Пароль"
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button onClick={handleLogin} >Увійти</button>
      <button onClick={handleRegister}>Зареєструватися</button>
      </form>      
    </div>
  );
};

export default LoginForm;
