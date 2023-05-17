import { FormEvent, useRef, useState } from 'react';
import RegisterField from '../../components/register-field/register-field.component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formFields = [
  { id: 'email', placeholder: 'Email' },
  { id: 'username', placeholder: 'Username' },
  { id: 'password', placeholder: 'Password' },
  { id: 'confirmPassword', placeholder: 'Confirm Password' },
];

const Signup = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const userData = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    if (
      !(
        userData.email &&
        userData.username &&
        userData.password &&
        userData.confirmPassword
      )
    )
      return setErrorMessage('empty field');

    if (userData.password !== userData.confirmPassword)
      return setErrorMessage('unmatched password');

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local/signup`,
        userData
      );
      navigate('/chat');
    } catch (error) {
      return setErrorMessage(error?.response.data.message);
    }

    // formRef.current.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <RegisterField key={field.id} field={field} />
          ))}

          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none active:shadow-outline mb-2">
              Register
            </button>
          </div>

          <div className="text-red-500 text-center h-6 text-sm">
            {errorMessage}
          </div>

          <div className="flex items-center justify-center text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
