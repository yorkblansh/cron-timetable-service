/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { io } from 'socket.io-client'
import { TaskEventsEnum, TaskProps } from './vars-ts/node-timetable'
import { TieBus } from './vars-ts/tiebus'

const socket = io('localhost/tasker')

export const localTieBus = () =>
	({
		onEvent: (event: keyof typeof TaskEventsEnum, cb: (task_obj: TaskProps) => void) => {
		},
		emit: (event: keyof typeof TaskEventsEnum, task_obj: TaskProps) => {
		},
		UNSAFE_socket: socket,
	} as TieBus<typeof socket>)
