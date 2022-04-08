import { onEvent } from './app/net/onEvent'
import { TaskManager } from './app/Tasker'
import { TaskEvents } from './app/vars-ts/net'
import { ConvertEnum } from './app/vars-ts/fns'

const startService = () => {
	const taskEventsArray = ConvertEnum(TaskEvents).toArray_Of_OBJECTS()
	const taskManager = new TaskManager()

	console.dir('STAAARTTT')

	taskEventsArray.map(({ value: taskEvent }) => {
		onEvent(taskEvent, taskProps => taskManager[taskEvent](taskProps))
	})

	// onEvent(ADD_TASK, taskProps => tm.addTask(taskProps))
	// onEvent(START_TASK, taskProps => tm.startTask(taskProps))
	// onEvent(STOP_TASK, taskProps => tm.stopTask(taskProps))
	// onEvent(UPDATE_TASK, taskProps => tm.updateTask(taskProps))
}

startService()
