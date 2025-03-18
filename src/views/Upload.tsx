import {ChangeEvent, useState, useRef} from 'react';
import {useForm} from '../hooks/FormHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
// import { useNavigate } from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  // const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files[0]) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        setUploadResult('Missing file or authentication.');
        return;
      }

      // Upload file and metadata
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      setUploadResult('Media file uploaded successfully!');
      resetForm();
    } catch (e) {
      console.error((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);

    // Clear file input field
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-950">
        Upload
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg space-y-6 rounded-lg bg-white p-6 shadow-lg"
      >
        {/* Title Input */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text--300 mb-1 font-semibold text-gray-950"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
            className="rounded-md border p-2 text-gray-950 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 font-semibold text-gray-950"
          >
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
            className="rounded-md border p-2 text-gray-950 outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* File Input */}
        <div className="flex flex-col">
          <label htmlFor="file" className="mb-1 font-semibold text-gray-950">
            Upload File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
            className="cursor-pointer rounded-md border border-gray-950 bg-white p-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Preview Image */}
        {file && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="h-48 w-48 rounded-md border border-gray-300 object-cover shadow-md"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!file || inputs.title.length < 4 || !inputs.description}
            className={`rounded-md px-4 py-2 font-semibold text-white transition ${
              !file || inputs.title.length < 4 || !inputs.description
                ? 'cursor-not-allowed bg-gray-950'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading..' : 'Upload'}
          </button>
          <button
            type="reset"
            onClick={resetForm}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Reset
          </button>
        </div>

        {/* Upload Result */}
        {uploadResult && (
          <p className="text-center font-semibold text-gray-700">
            {uploadResult}
          </p>
        )}
      </form>
    </>
  );
};

export default Upload;
