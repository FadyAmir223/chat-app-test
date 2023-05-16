type RegisterFieldProps = {
  field: {
    id: string;
    placeholder: string;
  };
};

const RegisterField = ({ field }: RegisterFieldProps) => {
  const { id, placeholder } = field;

  let type = 'password';
  if (id === 'email') type = 'email';
  if (id === 'username') type = 'text';

  return (
    <div className="mb-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        name={id}
      />
    </div>
  );
};

export default RegisterField;
