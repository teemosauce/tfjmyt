<template>
	<div id="home">
		<div class="panel">
			<div class="panel-title">设备监控导引</div>
			<div class="panel-content">
				<el-tree :data="data" node-key="id" :default-expanded-keys="['1']" :accordion="true" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent">
				</el-tree>
			</div>
		</div>
	</div>
</template>

<script>
import { queryAlarms, queryCategoryAlarms } from '../../apis/alarm'
import { queryMenu } from '../../apis/agent-config'
const ALARM_COLORS = ['green', 'red', 'orange', 'yellow', 'blue']


export default {
	name: 'Home',
	componentName: 'Home',
	data() {
		return {
			data: [],
			defaultProps: {
				children: 'children',
				label: 'label',
				priority: 'priority'
			}
		}
	},

	async created() {

		let r = await queryMenu()
		let menus = r.data

		let r1 = await queryAlarms()
		let alarms = r1.data

		let map = {}
		menus.forEach(menu => {
			var endpoint = this.getParam(menu.menu_href, 'var-endpoint')
			if (endpoint === 'undefined') {
				endpoint = undefined
			}

			map[menu.menu_id] = {
				id: menu.menu_id,
				name: menu.menu_name,
				href: menu.menu_href,
				endpoint: endpoint,
				parentId: menu.menu_pid,
				children: [],
				isAlarming: alarms[endpoint] > 0,
				priority: alarms[endpoint] > 0 && alarms[endpoint] || 0,
				isParent: menu.isparent === 'true',
				isRoot: menu.menu_pid === '0'
			}
		})
		const tree = this.generateTree(map)
		this.data = this.treeToArray(tree)


	},

	methods: {
		handleNodeClick(...args) {
			console.log(args)
		},

		renderContent(h, { node, data, store }) {
			var priority = node.data.priority
			return (
				<span>
					<span>
						<span>{node.label}</span>
					</span>
					{this.getColorCircle(data.priority)}
				</span>)
		},

		getColorCircle(priority) {
			return <span class={'alarm ' + this.getAlarmColor(priority)}></span>
		},

		getAlarmColor(priority) {
			return ALARM_COLORS[priority] || ALARM_COLORS[0]
		},

		getParam(url, name, decode) {
			if (typeof url === 'string' && url != '') {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
					r = url.substr(1).match(reg)
				if (r !== null)
					return decode && decode(r[2]) || unescape(r[2])
			}
			return null
		},

		matchedParent(node, map) {
			if (node.isAlarming) {
				var parentNode = map[node.parentId]
				if (parentNode) {
					parentNode.isAlarming = true
					if (parentNode.priority === 0 || (parentNode.priority != 0 && node.priority !== 0 && parentNode.priority > node.priority)) {
						parentNode.priority = node.priority
					}
					this.matchedParent(parentNode, map)
				}
			}
		},

		generateTree(map) {
			let tree
			for (let id in map) {
				let node = map[id]
				if (node.isRoot) {
					tree = node
				} else {
					let parentNode = map[node.parentId]
					if (parentNode) {
						parentNode.children.push(node)
						this.matchedParent(node, map)
					}
				}
			}
			return tree
		},

		treeToArray(tree, arr) {
			arr = arr || []
			var node = {
				id: tree.id,
				label: tree.name,
				priority: tree.priority
			}
			arr.push(node)
			if (tree.children instanceof Array && tree.children.length > 0) {
				node.children = []
				tree.children.forEach(item => {
					this.treeToArray(item, node.children)
				})
			}
			return arr
		}
	}
}
</script>

<style lang="scss">
#home {
	
	.panel {
		width: 35%;
		min-width: 350px;
		height: 435px;
		border-radius: 5px; // border: 100px solid #ccc;
		.panel-title {
			background: #0066cb;
			color: #fff;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			padding: 5px 8px;
			z-index: -1000;
		}

		.panel-content {
			border: 1px solid #ccc;
			border-top: 0;
			height: inherit;
			background: #fff;
			padding: 10px 5px;
			
		}

		.el-tree {
			border: 0;
			height: inherit;
			overflow-y: auto;
			>.el-tree-node {
				.el-tree-node__content {
					height: 27px;
					line-height: 27px;
					color: #000;
					background: #EBEBEB;
					margin-top: 1px;
				}

				>.el-tree-node__content {
					background: #CCC;
				}

				.alarm {
					float: right;
					margin-top: 8.5px;
					margin-right: 5px;
					width: 10px;
					height: 10px;
					border-radius: 5px;
				}

				.alarm.red {
					background: red;
					-webkit-animation: range 1s infinite;
					-moz-animation: range 1s infinite;
					-ms-animation: range 1s infinite;
					-o-animation: range 1s infinite;
					animation: range 1s infinite;
				}

				.alarm.blue {
					background: blue;
					-webkit-animation: range 1s infinite;
					-moz-animation: range 1s infinite;
					-ms-animation: range 1s infinite;
					-o-animation: range 1s infinite;
					animation: range 1s infinite;
				}

				.alarm.orange {
					background: orange;
					-webkit-animation: range 1s infinite;
					-moz-animation: range 1s infinite;
					-ms-animation: range 1s infinite;
					-o-animation: range 1s infinite;
					animation: range 1s infinite;
				}

				.alarm.yellow {
					background: yellow;
					-webkit-animation: range 1s infinite;
					-moz-animation: range 1s infinite;
					-ms-animation: range 1s infinite;
					-o-animation: range 1s infinite;
					animation: range 1s infinite;
				}

				.alarm.green {
					background: #B1D005;
				}

				@-webkit-keyframes range {
					100% {
						opacity: 0;
						transform: scale(1.4);
					}
				}

				@-moz-keyframes range {
					100% {
						opacity: 0;
						transform: scale(1.4);
					}
				}

				@-o-keyframes range {
					100% {
						opacity: 0;
						transform: scale(1.4);
					}
				}

				@keyframes range {
					100% {
						opacity: 0;
						transform: scale(1.4);
					}
				}
			}
		}
	}
}
</style>

