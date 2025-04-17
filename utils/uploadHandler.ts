import supabase from '@/config/supabaseClient';

interface ITypeUpload {
  file: File | null | undefined;
}

const uploadHandler = async ({ file }: ITypeUpload) => {
  let dataPath: string | undefined;
  let errorMsg: string | undefined;

  await supabase.storage
    .from('universe')
    .upload(file?.name ?? '', file as any, {
      contentType: file?.type,
      upsert: true,
    })
    .then((data) => {
      const mainURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const folderPath = `/storage/v1/object/public/universe/`;

      dataPath = `${mainURL}${folderPath}${encodeURI(data.data?.path ?? '')}`;
      errorMsg = data.error?.message;
    });

  return {
    dataPath,
    errorMsg,
  };
};

export default uploadHandler;
