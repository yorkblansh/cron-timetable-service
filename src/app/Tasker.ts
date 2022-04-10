/* eslint-disable prefer-const */
import CronJobManager from 'cron-job-manager'
import { ITaskProps } from './net/typings'
import { TaskEvents } from './vars-ts/net'
// const { ADD_TASK, START_TASK, STOP_TASK, UPDATE_TASK } = TaskEvents

export interface ITMmethods {
	ADD_TASK
	START_TASK
	STOP_TASK
	UPDATE_TASK
}

const TMmethods = (manager: CronJobManager) =>
	({
		ADD_TASK: ({ job_key, cron_exp, task }: ITaskProps): void =>
			manager.add(job_key, cron_exp, () => console.dir(task)),
		START_TASK: ({ job_key }: ITaskProps): void => manager.start(job_key),
		STOP_TASK: ({ job_key }: ITaskProps): void => manager.stop(job_key),
		UPDATE_TASK: ({ cron_exp, job_key, task }: ITaskProps): void =>
			manager.update(job_key, cron_exp, () => console.dir(task)),
	} as ITMmethods)

export class TaskManager {
	private manager: CronJobManager
	public perf

	constructor(private task_manager_key: string, private task_manager_schedule: string) {
		this.manager = new CronJobManager(
			// this creates a new manager and adds the arguments as a new job.
			task_manager_key,
			task_manager_schedule, // the crontab schedule
			() => {
				console.dir('tick - what should be executed?')
			},
			{
				// see https://www.npmjs.com/package/cron for all available
				start: true,
				timezone: 'Europe/Moscow',
				onComplete: () => {
					console.log('a_key_string_to_call_this_job has stopped....')
				},
			},
		)
		this.perf = TMmethods(this.manager)
		// const _m = TMmethods
		// for (let n in TMmethods) {
		// 	this.perf[n] = TMmethods[n]
		// }
	}

	// public ADD_TASK = ({ job_key, cron_exp, task }: ITaskProps): void =>
	// 	this.manager.add(job_key, cron_exp, () => console.dir(task))

	// public START_TASK = ({ job_key }: ITaskProps): void => this.manager.start(job_key)

	// public STOP_TASK = ({ job_key }: ITaskProps): void => this.manager.stop(job_key)

	// public UPDATE_TASK = ({ cron_exp, job_key, task }: ITaskProps): void =>
	// 	this.manager.update(job_key, cron_exp, () => console.dir(task))
}
