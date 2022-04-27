/* eslint-disable prefer-const */
import CronJobManager from 'cron-job-manager'
import { TaskManager, TaskProps } from './vars-ts/node-timetable'
import { TieBus } from './vars-ts/tiebus'

interface TaskManagerProps {
	task_manager_key: string
	cronexp?: string
	exec: TieBus['executor']['emit']
	logger: any
}

export class TaskManagerInstance implements TaskManager {
	private manager: CronJobManager
	private logger: any
	private exec: TieBus['executor']['emit']

	constructor({ cronexp, task_manager_key, exec, logger }: TaskManagerProps) {
		this.manager = new CronJobManager(
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
		this.exec = exec
		this.logger = logger
	}

	public ADD_TASK({ job_key, cron_exp, action }: TaskProps): void {
		this.manager.add(job_key, cron_exp, () => {
			this.exec('listen_exec', action)
		})
	}

	public START_TASK({ job_key }: TaskProps): void {
		this.manager.start(job_key)
	}

	public STOP_TASK({ job_key }: TaskProps): void {
		this.manager.stop(job_key)
	}

	public UPDATE_TASK({ job_key, cron_exp, action }: TaskProps): void {
		this.manager.update(job_key, cron_exp, () => {
			this.exec('listen_exec', action)
		})
	}
}
