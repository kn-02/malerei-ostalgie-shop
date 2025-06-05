
import React from 'react';
import { Users, Shield, ShieldCheck } from 'lucide-react';
import { useUsers, useAssignRole } from '@/hooks/useUserManagement';
import { useAuth } from '@/hooks/useAuth';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const { data: users = [], isLoading } = useUsers();
  const assignRole = useAssignRole();

  const handleRoleChange = (userId: string, newRole: 'admin' | 'user') => {
    if (userId === currentUser?.id && newRole === 'user') {
      if (!confirm('Sind Sie sicher, dass Sie sich selbst die Admin-Rechte entziehen möchten?')) {
        return;
      }
    }
    
    assignRole.mutate({ userId, role: newRole });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center text-gray-600">Lade Benutzer...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Benutzerverwaltung</h2>
        </div>
        <p className="text-red-100 mt-2">Verwalten Sie Benutzerrollen und Berechtigungen</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benutzer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-Mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rolle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registriert
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.first_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name && user.last_name 
                          ? `${user.first_name} ${user.last_name}`
                          : 'Unbekannter Benutzer'
                        }
                      </div>
                      <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.role === 'admin' ? 'Administrator' : 'Benutzer'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('de-DE')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRoleChange(user.id, 'user')}
                        disabled={assignRole.isPending}
                        className="text-red-600 hover:text-red-900 flex items-center space-x-1 disabled:opacity-50"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Admin entfernen</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user.id, 'admin')}
                        disabled={assignRole.isPending}
                        className="text-purple-600 hover:text-purple-900 flex items-center space-x-1 disabled:opacity-50"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Zu Admin machen</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Benutzer gefunden</h3>
          <p className="mt-1 text-sm text-gray-500">
            Es sind noch keine Benutzer registriert.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
