import {MediaItem} from 'hybrid-types/DBTypes';
import SingleView from '../components/SingleView.tsx';
import MediaRow from '../components/MediaRow.tsx';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/functions.ts';



const Home = () => {
    const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>
    (undefined);

   useEffect(() => {
    const getMedia = async () => { 
      try {
        // kaikki kuvat ilman thumbnailia / screenshotteja
      const media = await fetchData<MediaItem[]>
      (import.meta.env.VITE_MEDIA_API + '/media',
      );

      // haetaan mediat id:n mukaan, jotta saadaan thumbnailit
      const mediaWithThumbs = await Promise.all
      (media.map( async (item) => {
        const mediaItem = await fetchData <MediaItem>(
          import.meta.env.VITE_MEDIA_API + '/media/' + item.media_id,
        );
        mediaItem.filename = 
          import.meta.env.VITE_FILE_URL + mediaItem.filename
        mediaItem.thumbnail = mediaItem.thumbnail
          ? import.meta.env.VITE_FILE_URL + mediaItem.thumbnail 
          : null;

        if (mediaItem.screenshots &&
          typeof mediaItem.screenshots === 'string') 
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

    console.log(mediaWithThumbs);

      setMediaArray(mediaWithThumbs);
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