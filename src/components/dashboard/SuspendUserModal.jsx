import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaBan } from 'react-icons/fa';

const SuspendUserModal = ({ isOpen, onClose, user, onSubmit, isSubmitting }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (isOpen) {
            reset({
                reason: '',
                feedback: ''
            });
        }
    }, [isOpen, user, reset]);

    if (!isOpen || !user) return null;

    const inputClass = "input input-bordered w-full focus:outline-none focus:border-warning focus:ring-1 focus:ring-warning";
    const textareaClass = "textarea textarea-bordered w-full h-24 focus:outline-none focus:border-warning focus:ring-1 focus:ring-warning text-base";
    const labelClass = "label-text font-bold mb-1 block";

    return (
        <dialog className="modal modal-open">
            <div className="modal-box border bg-base-200 border-warning/20">
                <h3 className="font-bold text-2xl flex items-center gap-2 text-warning">
                    <FaBan /> Suspend User
                </h3>
                
                <div className="py-4">
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label pt-0">
                            <span className={labelClass}>Internal Reason (Admin Only)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Suspicious login activity"
                            {...register("reason", { required: "Internal reason is required" })}
                            className={inputClass}
                        />
                        {errors.reason && <span className="text-error text-sm mt-1">{errors.reason.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label pt-0">
                            <span className={labelClass}>Feedback (Visible to User)</span>
                        </label>
                        <textarea
                            placeholder="e.g., Violation of terms regarding..."
                            {...register("feedback", { required: "Feedback is required" })}
                            className={textareaClass}
                        ></textarea>
                        {errors.feedback && <span className="text-error text-sm mt-1">{errors.feedback.message}</span>}
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
                            className="btn btn-warning text-black"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <span className="loading loading-spinner"></span> : "Confirm Suspension"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
        </dialog>
    );
};

export default SuspendUserModal;