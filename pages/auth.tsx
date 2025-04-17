import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Input, Button } from '@/components/elements';
import { SignIn } from '@/service/API/auth/auth.mutation';
import { useAuth } from '@/hooks';

const Auth = () => {
  const router = useRouter();
  const { signIn } = useAuth();

  const { mutateAsync } = SignIn({
    onSuccess: (data) => {
      signIn(data);
    },
    onError: (error) => {
      toast.error('Login failed. Please check your credentials.');
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await mutateAsync({
      email: data.email as string,
      password: data.password as string,
    });
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center tablet:p-35 phone:p-10">
      <form
        className="flex flex-col justify-center w-[30%] h-full tablet:w-full phone:w-full"
        onSubmit={handleOnSubmit}
      >
        <Image src="/logo.svg" alt="" width={50} height={73} />
        <h1 className="text-3xl font-bold mt-5">Welcome 👋</h1>
        <p className="text-sm text-gray-400">Please Login to continue</p>

        <div className="flex flex-col gap-5 my-6">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full"
            required
          />
          <Input
            type="password"
            variant="password"
            placeholder="Password"
            name="password"
            className="w-full"
            required
          />
        </div>

        <Button type="submit">Login</Button>

        <p className="text-sm text-gray-400 mt-5">
          Not Have Account?{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => {
              router.push('/signup');
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
