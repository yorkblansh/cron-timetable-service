import CronJobManager from 'cron-job-manager'
import { ITaskProps } from './net/typings'

export class TaskManager {
	private manager: CronJobManager

	constructor() {
		this.manager = new CronJobManager(
			// this creates a new manager and adds the arguments as a new job.
			'a_key_string_to_call_this_job',
			'0 30 * * * *', // the crontab schedule
			() => {
				console.log('tick - what should be executed?')
			},
			{
				// extra options..
				// see https://www.npmjs.com/package/cron for all available
				start: true,
				timezone: 'Europe/Moscow',
				// timeZone: 'America/Los_Angeles',
				onComplete: () => {
					console.log('a_key_string_to_call_this_job has stopped....')
				},
			},
		)
	}

	public addTask = ({ job_key, cron_exp, task }: ITaskProps): void =>
		this.manager.add(job_key, cron_exp, () => console.dir(task))

	public startTask = ({ job_key }: ITaskProps): void => this.manager.start(job_key)

	public stopTask = ({ job_key }: ITaskProps): void => this.manager.stop(job_key)

	public updateTask = ({ cron_exp, job_key, task }: ITaskProps): void =>
		this.manager.update(job_key, cron_exp, () => console.dir(task))
}
