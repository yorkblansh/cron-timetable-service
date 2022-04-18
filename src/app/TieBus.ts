/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { io } from 'socket.io-client'
import { TaskEventsEnum, TaskProps } from './vars-ts/node-timetable'
import { TieBus } from './vars-ts/tiebus'

const socket = io('localhost/tasker')

export const localTieBus = () =>
	({
		onEvent: (event: TaskEventsEnum, cb: (task_obj: TaskProps) => void) => {
			socket.on(event, task_obj => cb(task_obj))
		},
		emit: (event: TaskEventsEnum, task_obj: TaskProps) => {
			socket.emit(event, task_obj)
		},
		UNSAFE_socket: socket,
	} as TieBus<typeof socket>)
