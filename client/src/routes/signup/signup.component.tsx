import { FormEvent, useRef } from 'react';
import RegisterField from '../../components/register-field/register-field.component';

const formFields = [
  { id: 'email', placeholder: 'Email' },
  { id: 'username', placeholder: 'Username' },
  { id: 'password', placeholder: 'Password' },
  { id: 'confirmPassword', placeholder: 'Confirm Password' },
];

const Signup = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    if (
      !(
        data.email &&
        data.username &&
        data.password &&
        data.confirmPassword &&
        data.password == data.confirmPassword
      )
    )
      return;
    console.log(data);

    // formRef.current.reset();
  };

  const renderFormFields = () =>
    formFields.map((field) => <RegisterField key={field.id} field={field} />);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md px-8 py-6 w-full max-w-sm">
        <form ref={formRef} onSubmit={handleSubmit}>
          {renderFormFields()}

          <div className="flex justify-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none active:shadow-outline">
              Register
            </button>
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
