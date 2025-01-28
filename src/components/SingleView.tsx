// SingleView.tsx
import { MediaItemWithOwner} from 'hybrid-types/DBTypes';

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
    <dialog open className='singleview'>
        <h2>{item?.title}</h2>
      <p>{item?.description}</p>
      {item?.media_type.startsWith('image') && (
        <img src={item?.filename} alt={item?.title} />
      )}
      {item?.media_type.startsWith('video') && (
        <video controls>
          <source src={item?.filename} type={item?.media_type} />
          Your browser does not support the video tag.
        </video>
      )}
      <button className='view' onClick={() => setSelectedItem(undefined)}>Close</button>
        <img src={item?.filename} alt={item?.title} />
    </dialog>
    </>
         
  );
};
export default SingleView;