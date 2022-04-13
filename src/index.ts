import { ConvertEnum } from './app/vars-ts/fns'
import { TaskEventsEnum } from './app/vars-ts/node-timetable'
import { localTieBus } from './app/TieBus'
import { TaskManagerInstance } from './app/TaskManager'

const startService = () => {
	const taskEventsArray = ConvertEnum(TaskEventsEnum).toObjectArray()
	const DevicesTaskManager = TaskManagerInstance({
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
