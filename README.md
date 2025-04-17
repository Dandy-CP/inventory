<p style="display: flex; justify-content: center;">
  <img src='./public/logoName.svg' />
</p>

# Inventory

This Project for Technical Test Purpose

## Installation

Install Project with npm:

```bash
  npm install
```

Run the development server:

```bash
  npm run dev
```

## Tech Stack

<p style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px">
  <img src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white' />
  <img src='https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white' />
  <img src='https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white' />
  <img src='https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white' />
  <img src='https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white' />
</p>

## Documentation

## Atomic Design

![Atomic](https://user-images.githubusercontent.com/4838076/33235048-d083dca6-d217-11e7-9aea-9a5ef5ae6fe7.png)

in this projects These Atoms Components called elements, Molecules is called Partials, Organisms is called Modules, and These Elements, Partials and Modules Components are render in Pages and called when they need

Advantages of Atomic Design: Modularity, Reusability, Updating and Maintenance

Feel free to update or enhance these components to meet the reqruitment needeed, there are all in components folder

## Usage/Examples With Elements Components

all elements components is exported in `index.ts` and called with barrel import, example

```typescript
import { Input, Button } from '@/components/elements';

function App() {
  return (
    <>
      <Input />
      <Button />
    </>
  );
}
```

All available properties / Props can be viewed on code

## Usage/Examples With React Query (GET Methode)

All reeact query function can be found and must be created in `/service/api` Folder, and in api folder must be created each folder name request or service depends on Backend condition and all request GET file must be named with \*.query.ts

example how to make function with react query:

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryFetch } from '@/config/queryClient';
import { ApiError } from '@/types/client.type';

// this interface example response from server
interface ExampleTypeResponse {
  responseData: string;
}

export const GetExample = (
  options?: UseQueryOptions<ExampleTypeResponse, ApiError>
) => {
  return useQuery<ExampleTypeResponse, ApiError>({
    queryKey: ['key'],
    queryFn: async () => {
      return await queryFetch({
        url: 'path/to/endpoint', //endpoint API at here
      });
    },
    ...options,
  });
};
```

Example for simple GET Request with React Query:

```typescript
import {
  GetExample,
  GetExampleWithParams,
} from '@/service/api/example/example.query';

const App = () => {
    const { data, isLoading, isError, error, refetch } = GetExample();

  return (
    .......
  );
}
```

in name function that we declare and make it's can be destructure.

`data` is value from server that can we can consume to render or something

`refetch` can be used for refetching when we need it

`isLoading` `isError` is boolean value which presents the result of a hit to the API as successful or currently in fetching state

`error` is return results from the server when an error occurs in retrieving data

## Usage/Examples With React Query (GET Methode With Parameter)

get methode with parameters, when parameter is needed to get data from server, We can create an object based on a request from the server

example how to make function react query with parameters:

```typescript
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryFetch } from '@/config/queryClient';
import { ApiError } from '@/types/client.type';

// this interface example response from server
interface ExampleTypeResponse {
  responseData: string;
}

// <T> is generic type for declare params type when call function
export const GetExampleWithParams = <T>(
  params?: T,
  options?: UseQueryOptions<ExampleTypeResponse, ApiError>
) => {
  return useQuery<ExampleTypeResponse, ApiError>({
    queryKey: ['key'],
    queryFn: async () => {
      return await queryFetch({
        url: 'path/to/endpoint',
        inputParams: {
          ...params,
        },
      });
    },
    ...options,
  });
};
```

for example at here i want to make request with parameter `id` and `userId`:

```typescript
import React, { useState } from 'react';
import {
  GetExample,
  GetExampleWithParams,
} from '@/service/api/example/example.query';

interface Params {
  id: number;
  userId: number;
}

const App = () => {
  const [idPost, setIDPost] = useState(1);

  const { data } = GetExampleWithParams<Params>(
    { id: idPost, userId: 1 },
    { queryKey: [idPost] }
    // queryKey parameters is needed when some client value is made a change similiar to array dependencies useEffect
  );

  return (
    .......
  );
}
```

## Usage/Examples With React Query (POST Methode)

all request POST,PUT,DELETE,PATCH file must be named with \*.mutation.ts and must be created in `/service/api` folder

example how to make function react query with POST request:

```typescript
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { mutationFetch } from '@/config/queryClient';
import { ApiError, MessageResult } from '@/types/client.type';

interface ExampleBody {
  key1: string;
  key2: string;
}

export const PostWithBodyExample = (
  options?: UseMutationOptions<MessageResult, ApiError, ExampleBody>
) => {
  return useMutation<MessageResult, ApiError, ExampleBody>({
    mutationFn: async (body) => {
      // body parameter value is get when use mutateAsync() function from destructuring value
      return await mutationFetch({
        url: 'path/to/endpoint', // path to endpoint
        method: 'POST', // Methode Request
        body: {
          // body payload request
          key1: body.key1,
          key2: body.key2,
        },
      });
    },
    ...options,
  });
};
```

here example how to senda data to server with methode POST on react query

```typescript
import { PostWithBodyExample } from '@/service/api/example/example.mutation';

const App = () => {
  const { mutateAsync } = PostWithBodyExample({
    onSuccess(data, variables, context) {
      // do some logic when request is success
    },
    onError(error, variables, context) {
      // do some logic when request is error from server
    },
  });

  const handleSendData = (examplePayload: string) => {
    // mutateAsync is function from react query to send body payload data to server
    mutateAsync({
      key1: examplePayload,
      key2: examplePayload,
    });
  };

  return (
    .......
  );
}
```

## Acknowledgements

- [Next.JS](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [DaisyUI](https://daisyui.com/components/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Atomic Design](https://github.com/danilowoz/react-atomic-design)
