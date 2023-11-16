import React, { Component, MouseEvent, TouchEvent } from 'react'
import Icon from '../shared/Icon'
import { warningToast } from '@/lib/actions/toast.actions'

interface Props {
  text: string;
  holdText: string;
  icon: string;
  isActive: boolean;
  onHoldStart: () => void; // Function to execute on hold start
  onHoldEnd: () => void; // Function to execute on hold end
}

interface State {
  holding: boolean;
  held: boolean;
  timerProgress: number;
}

class HoldToDeleteComponent extends Component<Props, State> {
	private timer: NodeJS.Timeout | null = null

	private holdStartTime: number | null = null

	constructor(props: Props) {
		super(props)
		this.state = {
			holding: false,
			held: false,
			timerProgress: 0
		}
	}

	handleHoldStart = () => {
		this.holdStartTime = Date.now()
		setTimeout(() => {
			this.timer = setInterval(() => {
				const { timerProgress, held, holding } = this.state
				if (!this.props.isActive && held) {
					if (timerProgress < 100) {
						this.setState({ timerProgress: timerProgress + 1 })
					} else if (timerProgress >= 100 && held) {
						this.handleHoldEnd()
						this.setState({ held: false })
						setTimeout(() => {
							this.props.onHoldStart()
						}, 200)
					} else {
						this.handleHoldEnd()
						this.setState({ held: false })
					}
				}
			}, 20)
		}, 1000)

		this.setState({ holding: true })
		setTimeout(() => {
			if (this.state.holding && Date.now() - this.holdStartTime! >= 1000) {
				if (this.props.isActive) {
					warningToast(
						'You can\'t delete the category you are currently viewing!'
					)
				} else {
					this.setState({ held: true })
				}
			}
		}, 1000)
	}

	handleHoldEnd = () => {
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}

		if (this.holdStartTime && Date.now() - this.holdStartTime < 1000) {
			this.setState({ held: false })
			this.props.onHoldEnd()
		}

		this.holdStartTime = null

		this.setState({ holding: false, held: false, timerProgress: 0 })
	}

	render() {
		const { holding, held, timerProgress } = this.state
		const {
			text, holdText, icon, isActive
		} = this.props

		return (
			<div>
				<button
					onMouseDown={this.handleHoldStart}
					onMouseUp={this.handleHoldEnd}
					onMouseLeave={this.handleHoldEnd}
					onTouchStart={this.handleHoldStart}
					onTouchEnd={this.handleHoldEnd}
					className={`relative p-4 rounded text-dark-2 dark:text-light-1 
					w-full
					${holding ? 'cursor-default' : 'cursor-pointer'}
					${isActive && 'bg-primary-500 text-light-1'}`}
				>
					{held ? (
						<div
							className="absolute inset-0 bg-sky-800 rounded"
							style={{ width: `${timerProgress}%`, transition: 'width 0.1s' }}
						></div>
					) : null}
					<div className="flex items-center">
						<Icon
							name={icon}
							stroke="1"
							strokeLinejoin="miter"
							isActive={isActive}
						/>
						<p className="pl-4">{held ? holdText : text}</p>
					</div>
				</button>
			</div>
		)
	}
}

export default HoldToDeleteComponent
