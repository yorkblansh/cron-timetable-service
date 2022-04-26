/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { io } from 'socket.io-client'
import { TaskEventsEnum, TaskProps } from './vars-ts/node-timetable'
import { TieBus } from './vars-ts/tiebus'

const socket_timetable = io('localhost/socket.timetable')
const socket_executor = io('localhost/socket.executor')

export const localTieBus = () =>
	({
		onEvent: (event: keyof typeof TaskEventsEnum, cb: (task_obj: TaskProps) => void) => {
			socket_timetable.on(event, task_obj => cb(task_obj))
		},
		emit: (event: keyof typeof TaskEventsEnum, task_obj: TaskProps) => {
			socket_executor.emit(event, task_obj)
		},
	} as TieBus)
