import { ConvertEnum } from './app/vars-ts/fns'
import { TaskEventsEnum } from './app/vars-ts/node-timetable'
import { localTieBus } from './app/TieBus'
import { TaskManagerInstance } from './app/TaskManager'

const startTimeTableService = () => {
	const taskEventsArray = ConvertEnum(TaskEventsEnum).toObjectArray()
	const TieBus = localTieBus()

	const DevicesTaskManager = new TaskManagerInstance({
		task_manager_key: 'device_schedules',
		cronexp: '0/5 * * * * *',
		exec: TieBus.emit,
		logger: console.dir,
	})

	taskEventsArray.map(({ value: taskEvent }) => {
		TieBus.onEvent(taskEvent, taskProps => {
			DevicesTaskManager[taskEvent](taskProps)
		})
	})
}

startTimeTableService()
