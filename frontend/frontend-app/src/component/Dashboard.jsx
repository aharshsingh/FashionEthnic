import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import '../component-css/Dashboard.css'
import { UserContext } from '../Context/UserContext';
import { User, Mail, Phone, Calendar, Users, Pencil, Plus } from 'lucide-react';

export default function Dashboard() {

    const { user } = useContext(UserContext);

    const details = [
        { label: 'Full Name', value: user?.userName, icon: User, editable: false },
        { label: 'Email ID', value: user?.email, icon: Mail, editable: false },
        { label: 'Mobile Number', value: user?.phoneNumber, icon: Phone, editable: true, to: '/UpdatePhone' },
        { label: 'Gender', value: user?.gender, icon: Users, editable: true, to: '/UpdateGender' },
        { label: 'Date of Birth', value: user?.dob, icon: Calendar, editable: true, to: '/UpdateDOB' },
    ];

    return (
        <div className="animate-fade-up">
            {/* Header */}
            <div className="flex flex-col gap-1 border-b border-navy/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-display text-2xl font-bold text-navy">Profile Details</h2>
                    <p className="mt-1 text-sm text-navy/50">
                        Manage your personal information and account details.
                    </p>
                </div>
                <Link to="/UpdatePhone">
                    <button className="btn-ghost mt-3 text-sm sm:mt-0">
                        <Pencil className="h-4 w-4" /> Edit Profile
                    </button>
                </Link>
            </div>

            {/* Detail rows */}
            <div className="mt-2 divide-y divide-navy/5">
                {details.map(({ label, value, icon: Icon, editable, to }) => (
                    <div
                        key={label}
                        className="flex items-center gap-4 py-4"
                    >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy">
                            <Icon className="h-5 w-5" />
                        </span>

                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-navy/45">
                                {label}
                            </p>
                            {value ? (
                                <p className="mt-0.5 truncate font-medium text-navy">{value}</p>
                            ) : (
                                <p className="mt-0.5 text-sm italic text-navy/40">Not added yet</p>
                            )}
                        </div>

                        {editable && (
                            <Link
                                to={to}
                                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-navy/15 px-4 py-1.5 text-sm font-semibold text-navy transition-all hover:border-coral hover:bg-coral/5 hover:text-coral"
                            >
                                {value ? (
                                    <><Pencil className="h-3.5 w-3.5" /> Edit</>
                                ) : (
                                    <><Plus className="h-3.5 w-3.5" /> Add</>
                                )}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
