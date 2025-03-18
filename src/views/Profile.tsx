import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div className="flex min-h-screen items-center justify-center border-gray-300">
      <div className="max-w-md rounded-md bg-white p-4 text-gray-950 shadow-md">
        <h2 className="mb-4 text-center text-xl font-bold">Profile</h2>
        {user && (
          <>
            <p className="font-medium">
              {user.username}{' '}
              <span className="text-gray-500">({user.email})</span>
            </p>
            <p>
              User Level:{' '}
              <span className="text-blue-600">{user.level_name}</span>
            </p>
            <p>
              Registered:{' '}
              {new Date(user.created_at).toLocaleDateString('fi-FI')}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default Profile;
