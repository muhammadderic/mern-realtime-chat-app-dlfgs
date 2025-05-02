import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(inputs);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center mb-4'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10 p-2'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10 p-2'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <Link
            to='/signup'
            className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'
          >
            {"Don't"} have an account?
          </Link>

          <div className="flex w-full justify-end">
            <button
              className="px-4 py-2 rounded-full border border-gray-500 bg-transparent cursor-pointer hover:bg-gray-600/50 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;