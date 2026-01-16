'use client';

import { useState, useEffect } from 'react';
import AdminPageWrapper, { PermissionGuard } from '@/components/admin/admin-page-wrapper';
import AdminHeader from '@/components/admin/admin-header';
import { AnimatePresence, motion } from 'framer-motion';
import { Users2, Shield, Plus, Key, Trash2, Edit, Save, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking, useAdminUser } from '@/firebase';
import { collection, doc } from 'firebase/firestore';

// Data Types
type User = {
  id: string;
  name: string;
  roleId: string;
  passkey: string;
};
type Role = {
  id: string;
  name: string;
  permissions: { [key: string]: { [key: string]: boolean } };
};


const pages = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'upload-provider', name: 'Upload Provider' },
    { id: 'manage-providers', name: 'Manage Providers' },
    { id: 'upload-blog', name: 'Upload Blog' },
    { id: 'manage-blogs', name: 'Manage Blogs' },
    { id: 'newsletters', name: 'Newsletters' },
    { id: 'debug', name: 'Debug' },
    { id: 'manage-users', name: 'Manage Users' },
];

const permissionTypes = ['view', 'create', 'edit', 'delete'];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};


function ManageUsersContent() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const { session, hasPermission } = useAdminUser();

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');

  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const usersQuery = useMemoFirebase(() => firestore ? collection(firestore, 'admin_users') : null, [firestore]);
  const { data: users, isLoading: usersLoading } = useCollection<User>(usersQuery);

  const rolesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'admin_roles') : null, [firestore]);
  const { data: roles, isLoading: rolesLoading } = useCollection<Role>(rolesQuery);

  const handleAddUser = async () => {
    if (!newUserName || !newUserRole) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please enter a name and select a role.' });
      return;
    }
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Database not connected.' });
      return;
    }
    const passkey = `PASS-${newUserName.toUpperCase().slice(0, 4)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    const newUser = { name: newUserName, roleId: newUserRole, passkey };
    await addDocumentNonBlocking(collection(firestore, 'admin_users'), newUser);
    
    toast({ title: 'User Added', description: `${newUserName}'s passkey is ${passkey}. Please save it securely.`, duration: 9000 });
    setNewUserName('');
    setNewUserRole('');
    setIsAddingUser(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (!firestore) return;
    // Prevent deleting the currently logged-in user
    if (session?.user.id === userId) {
        toast({ title: 'Action Denied', description: 'You cannot delete your own account.', variant: 'destructive' });
        return;
    }
    deleteDocumentNonBlocking(doc(firestore, 'admin_users', userId));
    toast({ title: 'User Deleted', variant: 'destructive' });
  };

  const handleAddRole = async () => {
    if (!newRoleName) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please enter a role name.' });
        return;
    }
    if (!firestore) return;
    await addDocumentNonBlocking(collection(firestore, 'admin_roles'), { name: newRoleName, permissions: {} });
    toast({ title: 'Role Added' });
    setNewRoleName('');
    setIsAddingRole(false);
  };

  const handlePermissionChange = (roleId: string, pageId: string, permission: string, checked: boolean) => {
    if (!firestore) return;
    const fieldPath = `permissions.${pageId}.${permission}`;
    updateDocumentNonBlocking(doc(firestore, 'admin_roles', roleId), { [fieldPath]: checked });
  };
  
  if (usersLoading || rolesLoading) {
      return (
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
          </div>
      )
  }

  return (
    <PermissionGuard pageId="manage-users">
        <div className="p-4 sm:p-8 md:p-12 text-zinc-900">
            <AdminHeader userName={session?.user.name || 'Admin'} />

            <motion.div className="mt-12 space-y-12" variants={containerVariants} initial="hidden" animate="visible">
            {/* User Management */}
            <motion.div variants={itemVariants}>
                <div className="relative bg-white/60 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-zinc-200/50">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-headline flex items-center gap-3"><Users2 className="w-7 h-7 text-yellow-600" /> User Management</h2>
                    {!isAddingUser && (
                    <Button onClick={() => setIsAddingUser(true)} className="rounded-full bg-zinc-800 hover:bg-zinc-700" disabled={!hasPermission('manage-users', 'create')}>
                        <Plus className="mr-2" /> Add User
                    </Button>
                    )}
                </div>

                <AnimatePresence>
                    {isAddingUser && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-yellow-50/50 p-4 rounded-lg mb-6 border border-yellow-200">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-grow">
                            <Label htmlFor="new-user-name">User Name</Label>
                            <Input id="new-user-name" placeholder="e.g., John Doe" value={newUserName} onChange={e => setNewUserName(e.target.value)} />
                        </div>
                        <div className="w-full sm:w-52">
                            <Label>Role</Label>
                            <Select value={newUserRole} onValueChange={setNewUserRole}>
                            <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                            <SelectContent>{roles?.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleAddUser} size="icon"><Save /></Button>
                            <Button onClick={() => setIsAddingUser(false)} size="icon" variant="destructive"><X /></Button>
                        </div>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="space-y-3">
                    {users && users.map(user => (
                    <div key={user.id} className="grid grid-cols-3 gap-4 items-center bg-white p-3 rounded-lg border border-zinc-100">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full text-center text-sm">{roles?.find(r => r.id === user.roleId)?.name}</span>
                        <div className="flex items-center justify-end gap-2">
                            <span className="font-mono text-xs bg-zinc-800 text-white px-2 py-1 rounded">{user.passkey}</span>
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDeleteUser(user.id)} disabled={!hasPermission('manage-users', 'delete')}><Trash2 className="w-4 h-4 text-red-500"/></Button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </motion.div>

            {/* Role Management */}
            <motion.div variants={itemVariants}>
                <div className="relative bg-white/60 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-zinc-200/50">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-headline flex items-center gap-3"><Shield className="w-7 h-7 text-yellow-600" /> Role & Permission Management</h2>
                    {!isAddingRole && (
                    <Button onClick={() => setIsAddingRole(true)} className="rounded-full bg-zinc-800 hover:bg-zinc-700" disabled={!hasPermission('manage-users', 'create')}>
                        <Plus className="mr-2" /> Add Role
                    </Button>
                    )}
                </div>

                    <AnimatePresence>
                    {isAddingRole && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-yellow-50/50 p-4 rounded-lg mb-6 border border-yellow-200">
                        <div className="flex gap-4 items-end">
                        <div className="flex-grow">
                            <Label htmlFor="new-role-name">New Role Name</Label>
                            <Input id="new-role-name" placeholder="e.g., Marketing" value={newRoleName} onChange={e => setNewRoleName(e.target.value)} />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleAddRole} size="icon"><Save /></Button>
                            <Button onClick={() => setIsAddingRole(false)} size="icon" variant="destructive"><X /></Button>
                        </div>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>

                    <div className="space-y-8">
                        {roles && roles.map(role => (
                            <div key={role.id} className="p-4 rounded-lg bg-white border border-zinc-100">
                                <h3 className="text-xl font-semibold mb-4">{role.name}</h3>
                                <div className="space-y-2">
                                    {pages.map(page => (
                                        <div key={page.id} className="grid grid-cols-2 md:grid-cols-5 items-center p-2 rounded-md hover:bg-zinc-50">
                                            <span className="font-medium col-span-2 md:col-span-1">{page.name}</span>
                                            {permissionTypes.map(pType => (
                                                <div key={pType} className="flex items-center gap-2">
                                                    <Checkbox 
                                                        id={`${role.id}-${page.id}-${pType}`} 
                                                        checked={role.permissions?.[page.id]?.[pType] || false}
                                                        onCheckedChange={(checked) => handlePermissionChange(role.id, page.id, pType, !!checked)}
                                                        disabled={!hasPermission('manage-users', 'edit')}
                                                    />
                                                    <Label htmlFor={`${role.id}-${page.id}-${pType}`} className="capitalize text-sm text-zinc-700">{pType}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
            </motion.div>
        </div>
    </PermissionGuard>
  );
}


export default function ManageUsersPage() {
  return (
    <AdminPageWrapper screenTitle="Manage Users & Roles">
      <ManageUsersContent />
    </AdminPageWrapper>
  );
}
