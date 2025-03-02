import { useAuth } from '@/Context/userContext'
import React from 'react'

function Profile() {
  const { user } = useAuth() // Assuming useAuth provides user info

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-background text-foreground  shadow-lg rounded-lg overflow-hidden p-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user?.profileImage || 'https://avatars.githubusercontent.com/u/124599?v=4'}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="text-3xl font-semibold">{user?.name || 'User Name'}</h2>
        <p className="text-gray-400 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
      </div>

      {/* Profile Details */}
      <div className="mt-8 space-y-4">
        <div className="p-4  bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Bio</h3>
          <p className="text-foreground dark:text-gray-300">
            {user?.bio || 'No bio available'}
          </p>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Account Type</h3>
          <p className="text-gray-600 dark:text-gray-300">Standard User</p>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Member Since</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {user?.createdAt ? new Date(user.createdAt).toDateString() : 'Unknown'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Need to update your profile? Contact support.
        </p>
      </div>
    </div>
  )
}

export default Profile
