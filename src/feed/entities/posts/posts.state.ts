import { createStore } from 'solid-js/store'

import type { Post } from './posts.types'

export const POSTS_ROUTE_IDS = ['today', 'yesterday', 'week']

export const [posts, setPosts] = createStore<Record<Post['uuid'], Post>>({})
