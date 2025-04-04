export type TaskStatus = "ongoing" | "complete"

export const TASK_STATUS_COMPLETE: TaskStatus = "complete"
export const TASK_STATUS_ONGOING: TaskStatus = "ongoing"

export type Task = {
    id: string;
    title: string;
    status: TaskStatus;
    created_at: string;
}
