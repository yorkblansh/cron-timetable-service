import { Socket } from 'socket.io-client'
import { socket } from './_socket'
import { ITaskProps } from './typings'

export const onEvent = (event: string, cb: (task_obj: ITaskProps) => void): Socket =>
	socket.on(event, task_obj => cb(task_obj))
