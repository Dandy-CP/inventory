import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Input, Button } from '@/components/elements';
import { SignUpUser } from '@/service/API/auth/auth.mutation';
import { AuthSignUpBody } from '@/types/auth/auth.types';

const SignUp = () => {
  const router = useRouter();

  const { mutateAsync, isPending } = SignUpUser({
    onSuccess: () => {
      toast.success('Success Register, Please Login');
      router.push('/auth');
    },
    onError: () => {
      toast.error('Register failed. Please try again');
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as AuthSignUpBody;

    await mutateAsync({ ...data });
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center tablet:p-35 phone:p-10">
      <form
        className="flex flex-col justify-center w-[30%] h-full tablet:w-full phone:w-full"
        onSubmit={handleOnSubmit}
      >
        <Image src="/logo.svg" alt="" width={50} height={73} />
        <h1 className="text-3xl font-bold mt-5">Welcome 👋</h1>
        <p className="text-sm text-gray-400">Please Register to continue</p>

        <div className="flex flex-col gap-5 my-6">
          <Input placeholder="Name" name="name" className="w-full" required />

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
            minLength={8}
            required
          />
        </div>

        <Button type="submit" disabled={isPending} loading={isPending}>
          Register
        </Button>

        <p className="text-sm text-gray-400 mt-5">
          Have Account?{' '}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() => {
              router.push('/auth');
            }}
          >
            LogIn
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
