import { ConvertEnum } from './app/vars-ts/fns'
import { TaskEventsEnum } from './app/vars-ts/cron-task-manager'
import { localTieBus } from './app/TieBus'
import { newTaskManager } from './app/TaskManager'

const startService = () => {
	const taskEventsArray = ConvertEnum(TaskEventsEnum).toObjectArray()
	const DevicesTaskManager = newTaskManager({
		task_manager_key: 'device_schedules',
		cronexp: '0/5 * * * * *',
	})
	const TieBus = localTieBus()

	taskEventsArray.map(({ value: taskEvent }) => {
		TieBus.onEvent(taskEvent, taskProps => {
			DevicesTaskManager[taskEvent](taskProps)
		})
	})
}

startService()
