declare module '*.jpg' {
  const url: string
  export default url
}
declare module '*.jpeg' {
  const url: string
  export default url
}
declare module '*.png' {
  const url: string
  export default url
}
declare module '*.gif' {
  const url: string
  export default url
}
declare module '*.ico' {
  const url: string
  export default url
}
declare module '*.webp' {
  const url: string
  export default url
}
declare module '*.avif' {
  const url: string
  export default url
}

declare module '*.mp4' {
  const url: string
  export default url
}
declare module '*.webm' {
  const url: string
  export default url
}
declare module '*.ogg' {
  const url: string
  export default url
}
declare module '*.mp3' {
  const url: string
  export default url
}
declare module '*.wav' {
  const url: string
  export default url
}
declare module '*.flac' {
  const url: string
  export default url
}
declare module '*.aac' {
  const url: string
  export default url
}

declare module '*.svg' {
  const source: string
  export default source
}

declare module '*.sass' {
  const styles: Record<string, string>
  export default styles
}

declare module '*.webmanifest' {
  const url: string
  export default url
}

declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor()
    [property: string]: any
  }
  export default WebpackWorker
}
