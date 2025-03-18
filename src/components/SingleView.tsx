// SingleView.tsx
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  console.log(item);
  console.log('SingleView moi');
  return (
    <>
      <div className="overlay"></div>
      <dialog
        open
        className="fixed z-[9999] flex h-[90%] flex-col items-center justify-center rounded-lg bg-stone-950 p-6 text-white"
      >
        <h2 className="text-xl font-semibold">{item?.title}</h2>
        <p className="mb-4">{item?.description}</p>

        {item?.media_type.startsWith('image') && (
          <img
            src={item?.filename}
            alt={item?.title}
            className="h-auto max-w-full rounded-md"
          />
        )}

        {item?.media_type.startsWith('video') && (
          <video controls className="h-auto max-w-full rounded-md">
            <source src={item?.filename} type={item?.media_type} />
            Your browser does not support the video tag.
          </video>
        )}

        <button
          className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          onClick={() => setSelectedItem(undefined)}
        >
          Close
        </button>
      </dialog>
    </>
  );
};
export default SingleView;
