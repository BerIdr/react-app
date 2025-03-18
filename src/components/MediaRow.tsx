import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = ({item}: MediaItemProps) => {
  const {user} = useUserContext();

  return (
    <tr className="border-b border-gray-300 text-black transition hover:bg-gray-200">
      <td className="p-2">
        <img
          className="h-[100px] w-[180px] rounded-md object-cover shadow-sm"
          src={item.thumbnail || item.screenshots?.[2] || undefined}
          alt={item.title}
        />
      </td>
      <td className="p-2 font-semibold text-gray-950 hover:text-gray-900">
        {item.title}
      </td>
      <td className="p-2 text-gray-950 hover:text-gray-800">
        {item.description}
      </td>
      <td className="p-2 text-sm text-gray-950 hover:text-gray-700">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="p-2 text-gray-950">{item.filesize} KB</td>
      <td className="p-2 text-gray-950">{item.media_type}</td>
      <td className="p-2 font-medium text-gray-950">{item.username}</td>
      <td className="flex flex-col gap-1 p-2">
        <Link
          to="/single"
          state={{user, item}}
          className="rounded-md bg-blue-500 px-3 py-1 text-center text-white transition hover:bg-blue-600"
        >
          Show
        </Link>

        {(user?.user_id === item.user_id || user?.level_name === 'Admin') && (
          <>
            <button
              onClick={() => console.log('Modify pressed')}
              className="rounded-md bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
            >
              Modify
            </button>
            <button
              onClick={() => console.log('Delete pressed')}
              className="rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;
