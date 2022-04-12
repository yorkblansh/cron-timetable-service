/* eslint-disable prefer-const */
import CronJobManager from 'cron-job-manager'
import { TaskManager } from './vars-ts/cron-task-manager'

interface TaskManagerProps {
	task_manager_key: string
	cronexp?: string
}

export const newTaskManager = ({ cronexp, task_manager_key }: TaskManagerProps): TaskManager => {
	const manager = new CronJobManager(
		task_manager_key,
		cronexp ? cronexp : '0/5 * * * * *',
		() => console.dir(`TaskManager ${task_manager_key} still works!`),
		{
			// see https://www.npmjs.com/package/cron for all available
			start: true,
			timezone: 'Europe/Moscow',
			onComplete: () => console.log('a_key_string_to_call_this_job has stopped....'),
		},
	)

	return {
		ADD_TASK: ({ job_key, cron_exp, task }) => manager.add(job_key, cron_exp, () => console.dir(task)),
		START_TASK: ({ job_key }) => manager.start(job_key),
		STOP_TASK: ({ job_key }) => manager.stop(job_key),
		UPDATE_TASK: ({ cron_exp, job_key, task }) => manager.update(job_key, cron_exp, () => console.dir(task)),
	} as TaskManager
}
