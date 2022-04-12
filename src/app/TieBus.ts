/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { io } from 'socket.io-client'
import { TaskEventsEnum, TaskPropsInterface } from './vars-ts/cron-task-manager'
import { TieBus } from './vars-ts/tie-bus'

const socket = io('localhost/tasker')

export const localTieBus = () =>
	({
		onEvent: (event: TaskEventsEnum, cb: (task_obj: TaskPropsInterface) => void) => {
			socket.on(event, task_obj => cb(task_obj))
		},
		emit: (event: TaskEventsEnum, task_obj: TaskPropsInterface) => {
			socket.emit(event, task_obj)
		},
		UNSAFE_socket: socket,
	} as TieBus<typeof socket>)
