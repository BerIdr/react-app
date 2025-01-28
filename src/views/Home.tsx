import {MediaItem, MediaItemWithOwner, UserWithNoPassword} from 'hybrid-types/DBTypes';
import SingleView from '../components/SingleView.tsx';
import MediaRow from '../components/MediaRow.tsx';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/functions.ts';



const Home = () => {
    const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
    const [selectedItem, setSelectedItem] = useState<MediaItemWithOwner | undefined>
    (undefined);

   useEffect(() => {
    const getMedia = async () => { 
      try {
        // kaikki mediat ilman omistajan tietoja
      const media = await fetchData<MediaItem[]>
      (import.meta.env.VITE_MEDIA_API + '/media',
      );

      // haetaan id:n perusteella omistajan tiedot
      const mediaWithOwner: MediaItemWithOwner[] = await Promise.all
      (media.map( async (item) => {
        const owner = await fetchData <UserWithNoPassword>(
          import.meta.env.VITE_AUTH_API + '/users/' + item.media_id,
        );

        const mediaItem: MediaItemWithOwner = {
          ...item,
          username: owner.username,
        };

        if (
          mediaItem.screenshots &&
          typeof mediaItem.screenshots === 'string'
        ) 
          {
          mediaItem.screenshots = JSON.parse(
            mediaItem.screenshots as string).map(
            (screenshot: string) => {
          return import.meta.env.VITE_FILE_URL + screenshot;
            },
          );
        }
          return mediaItem;
      }),
    );

    console.log(mediaWithOwner);

      setMediaArray(mediaWithOwner);
    } catch (error) {
      console.error((error as Error).message);
    }
   };
    getMedia();
  }, []);

   console.log(mediaArray);

    return (
      <>
      { selectedItem && <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />}
     
        <h2>My Media</h2>
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created</th>
              <th>Size</th>
              <th>Type</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
             {mediaArray.map((item) => (
            <MediaRow 
            item={item}
             key={item.media_id}
             setSelectedItem={setSelectedItem} />
            ))}        
        </tbody>
        </table>

      </>
    );
  };
  export default Home;