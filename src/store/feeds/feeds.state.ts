export type Feeds = {
  ids: string[]
  messages: {
    [MessageId in string]: {}
  }
}
