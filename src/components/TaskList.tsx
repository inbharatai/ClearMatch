import React from 'react';
import { ReviewTask } from '../types';
import { ClipboardList, UserCheck, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: ReviewTask[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-rose-400" />
            <span>Human-Authorized AP Review Tasks</span>
          </h3>
          <p className="text-xs text-slate-400">
            Audit investigations logged with verifiable human confirmation and cryptographic timestamps.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          {tasks.length} Active {tasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                  {task.id}
                </span>
                <h4 className="text-xs font-bold text-white">{task.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {task.priority} PRIORITY
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {task.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {task.notes}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Assignee: {task.assignee}</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized by: {task.confirmedBy}</span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                <Clock className="w-3 h-3" />
                <span>{new Date(task.confirmedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="py-8 text-center text-slate-500 text-xs">
            No active audit review tasks. Discrepancies create tasks with human authorization.
          </div>
        )}
      </div>
    </div>
  );
};
