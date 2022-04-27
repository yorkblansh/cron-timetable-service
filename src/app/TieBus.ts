/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { io } from 'socket.io-client'
import { TieBus } from './vars-ts/tiebus'

const socket_timetable = io('localhost/socket.timetable')
const socket_executor = io('localhost/socket.executor')

export const localTieBus = () =>
	({
		timetable: {
			onEvent: (event, cb) => {
				socket_timetable.on(event, task_obj => cb(task_obj))
			},
		},
		executor: {
			emit: (event: 'listen_exec', task) => {
				socket_executor.emit(event, task)
			},
		},
	} as TieBus)
