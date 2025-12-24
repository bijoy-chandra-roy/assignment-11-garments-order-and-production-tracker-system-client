import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserEdit } from 'react-icons/fa';

const UpdateUserModal = ({ isOpen, onClose, user, onSubmit, isSubmitting }) => {
    const { register, handleSubmit, setValue, watch } = useForm();
    
    useEffect(() => {
        if (user) {
            setValue('role', user.role);
            setValue('status', user.status);
        }
    }, [user, setValue]);

    if (!isOpen || !user) return null;

    const canBecomeAdmin = user.role === 'manager' && user.status === 'active';

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-2xl flex items-center gap-2 mb-6">
                    <FaUserEdit className="text-primary" /> Manage User
                </h3>
                
                <div className="mb-6 bg-base-200 p-4 rounded-lg border border-base-300">
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-sm opacity-70 mb-2">{user.email}</p>
                    <div className="flex gap-2">
                         <span className="badge badge-neutral">Current Role: {user.role}</span>
                         <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {user.status}
                         </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Assign Role</span>
                        </label>
                        <select 
                            {...register("role")}
                            className="select select-bordered w-full"
                        >
                            <option value="buyer">Buyer</option>
                            <option value="manager">Manager</option>
                            
                            <option value="admin" disabled={!canBecomeAdmin}>
                                Admin {(!canBecomeAdmin) && "(Only Active Managers)"}
                            </option>
                        </select>
                        <label className="label">
                            <span className="label-text-alt text-gray-500">
                                Changing role updates permissions immediately.
                            </span>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Account Status</span>
                        </label>
                        <div className="flex gap-4">
                            <label className="cursor-pointer flex items-center gap-2 border p-3 rounded-lg flex-1 hover:bg-base-200">
                                <input 
                                    type="radio" 
                                    value="active"
                                    className="radio radio-success" 
                                    {...register("status")}
                                />
                                <span className="font-bold text-success">Active (Approve)</span>
                            </label>
                            
                            <label className="cursor-pointer flex items-center gap-2 border p-3 rounded-lg flex-1 hover:bg-base-200">
                                <input 
                                    type="radio" 
                                    value="pending"
                                    className="radio radio-warning" 
                                    {...register("status")}
                                />
                                <span className="font-bold text-warning">Pending</span>
                            </label>
                        </div>
                    </div>

                    <div className="modal-action">
                        <button 
                            type="button" 
                            className="btn btn-ghost" 
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <span className="loading loading-spinner"></span> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
        </dialog>
    );
};

export default UpdateUserModal;