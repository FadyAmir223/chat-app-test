import { FormEvent, useRef, useState } from 'react';
import RegisterField from '../../components/register-field/register-field.component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formFields = [
  { id: 'username', placeholder: 'Username' },
  { id: 'password', placeholder: 'Password' },
];

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const userData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    if (!(userData.username && userData.password))
      return setErrorMessage('empty field');

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        userData
      );
      console.log(data);

      // navigate('/chat');
    } catch (error) {
      console.log(error.response.data);
    }
    // formRef.current.reset();
  };

  const renderFormFields = () =>
    formFields.map((field) => <RegisterField key={field.id} field={field} />);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-sm">
        <form className="w-full max-w-sm" ref={formRef} onSubmit={handleSubmit}>
          {renderFormFields()}

          <div className="flex items-center justify-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none active:shadow-outline">
              Login
            </button>
          </div>

          <div className="text-red-500 text-center h-6 text-sm">
            {errorMessage}
          </div>

          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{' '}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Create one
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
