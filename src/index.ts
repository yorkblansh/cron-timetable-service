import { onEvent } from './app/net/onEvent'
import { TaskManager } from './app/Tasker'
import { TaskEvents } from './app/vars-ts/net'
import { ConvertEnum } from './app/vars-ts/fns'
import { every } from 'node-cron-expression'
import CronJobManager from 'cron-job-manager'
import { ITMmethods } from './app/Tasker'

const startService = () => {
	// const cron2 = every(2).minutes().

	const cronexp = '*/10 * * * * *'
	const TaskEventsArray = ConvertEnum(TaskEvents).toArray_Of_OBJECTS()
	const taskManager = new TaskManager('device_schedules', cronexp.toString())

	console.dir('device_schedules started')
	TaskEventsArray.map(({ value: taskEvent }) => onEvent(taskEvent, taskProps => taskManager[taskEvent](taskProps)))
	// taskManager.perf['ADD_TASK']({
	// 	job_key: 'tt',
	// 	cron_exp: '*/2 * * * * *',
	// 	task: 'tt',
	// })
	// taskManager.perf['START_TASK']({ job_key: 'tt' })
	// taskManager.addTASK({
	// 	job_key: 'tt',
	// 	cron_exp: '*/2 * * * * *',
	// 	task: 'tt',
	// })
}

startService()
